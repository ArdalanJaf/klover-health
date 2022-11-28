import React, { useState } from "react";
import { API_URL } from "../API/API_URL";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setContactForm,
  setContactErrors,
  clearContactErrors,
  clearContactForm,
} from "../redux/publicSlice";
import JoiErrorNote from "./JoiErrorNote";
import MsgSentNotification from "./MsgSentNotification";

function ContactForm() {
  const contactErrors = useSelector((state) => state.public.contactErrors);
  const contactForm = useSelector((state) => state.public.contactForm);
  const dispatch = useDispatch();
  const [messageSent, setMessageSent] = useState(false);

  // Send user-inputs to back-end.
  const sendContactForm = async (payload) => {
    try {
      const result = await axios.post(API_URL + "/contact", payload);

      // notify user that API is down, advise to email me.
      if (result.data.status === 0) {
        console.log(result);
        console.log("API error: " + result.data.error);

        // notify user of errors
      } else if (result.data.contactErrors) {
        // console.log(result.data.contactErrors);
        dispatch(setContactErrors(result.data.contactErrors));

        // notify user message recieved
      } else {
        // document.getElementById("contactForm").reset();
        dispatch(clearContactForm());
        setMessageSent(true);
      }
    } catch (error) {
      alert("API down " + error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Get In Touch</h2>
      <div className="row">
        <div className="col-12 col-md-6 order-md-2 text-center">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad labore
            dolor ullam ut corporis blanditiis, eum reprehenderit incidunt
            dolorum, atque inventore magnam debitis maxime, a veniam porro ex!
            Voluptatum, aperiam.
          </p>
        </div>
        <div className="col-12 col-md-6 order-md-1">
          <form
            className="contactForm"
            id="contactForm"
            onChange={(e) => {
              dispatch(
                setContactForm({ label: e.target.id, value: e.target.value })
              );
            }}
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              className="form-control mb-2"
            />
            {contactErrors.name !== undefined && (
              <JoiErrorNote error={contactErrors.name} />
            )}
            <label hidden htmlFor="name">
              Your name.
            </label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              className="form-control mb-2"
            />
            {contactErrors.email && (
              <JoiErrorNote error={contactErrors.email} />
            )}
            <label hidden htmlFor="email">
              Your email address.
            </label>

            <textarea
              className="textbox form-control mb-2"
              name="message"
              id="message"
              rows="6"
              placeholder="Your message"
            />
            <label hidden htmlFor="message">
              Your message.
            </label>
            {contactErrors.message && <JoiErrorNote inputName={"message"} />}
            <div className="text-center">
              <button
                className="btn btn-secondary"
                type="submit"
                name="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setMessageSent(false);
                  sendContactForm(contactForm);
                  dispatch(clearContactErrors());
                }}
                disabled={
                  contactForm.name && contactForm.email && contactForm.message
                    ? false
                    : true
                }
              >
                Send
              </button>
            </div>

            {messageSent && <MsgSentNotification />}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
