import React, { useState } from "react";
import { API_URL } from "../config/API_URL";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setJoiErrors,
  clearJoiErrors,
} from "../redux/contactSlice";
import JoiErrorNote from "./JoiErrorNote";
import MsgSentNotification from "./MsgSentNotification";

function ContactForm() {
  const joiErrors = useSelector((state) => state.contact.joiErrors);
  const formData = useSelector((state) => state.contact.formData);
  const dispatch = useDispatch();
  const [messageSent, setMessageSent] = useState(false);

  // Send user-inputs to back-end.
  const sendFormData = async (payload) => {
    try {
      const result = await axios.post(API_URL + "/contact", payload);

      // notify user that API is down, advise to email me.
      if (result.data.status === 0) {
        console.log(result);
        alert("API error: " + result.data.error);

        // notify user of errors
      } else if (result.data.joiErrors) {
        // console.log(result.data.joiErrors);
        dispatch(setJoiErrors(result.data.joiErrors));

        // notify user message recieved
      } else {
        document.getElementById("contactForm").reset();
        setMessageSent(true);
      }
    } catch (error) {
      alert("API down " + error);
    }
  };

  return (
    <form
      className="contactForm"
      id="contactForm"
      onInput={(e) => {
        dispatch(setFormData({ label: e.target.id, value: e.target.value }));
      }}
    >
      <input type="text" name="name" id="name" placeholder="YOUR NAME" />
      {joiErrors.name !== undefined && <JoiErrorNote inputName={"name"} />}
      <label hidden htmlFor="name">
        Your name.
      </label>

      <input type="email" name="email" id="email" placeholder="YOUR EMAIL" />
      {joiErrors.email && <JoiErrorNote inputName={"email"} />}
      <label hidden htmlFor="email">
        Your email address.
      </label>

      <textarea
        className="textbox"
        name="message"
        id="message"
        rows="6"
        placeholder="YOUR MESSAGE"
      />
      <label hidden htmlFor="message">
        Your message.
      </label>
      {joiErrors.message && <JoiErrorNote inputName={"message"} />}

      <button
        className="submitButton hover"
        type="submit"
        name="submit"
        onClick={(e) => {
          e.preventDefault();
          setMessageSent(false);
          sendFormData(formData);
          dispatch(clearJoiErrors());
        }}
      >
        GET IN TOUCH
      </button>

      {messageSent && <MsgSentNotification />}
    </form>
  );
}

export default ContactForm;
