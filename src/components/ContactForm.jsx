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

function ContactForm() {
  const contactErrors = useSelector((state) => state.public.contactErrors);
  const { name, email, message } = useSelector(
    (state) => state.public.contactForm
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
        dispatch(setContactErrors(result.data.contactErrors));
        setIsLoading(false);
      } else {
        dispatch(clearContactForm());
        setIsLoading(false);
        setMessageSent(true);
      }
    } catch (error) {
      alert("API down " + error);
    }
  };

  return (
    <div className="container" id="contact">
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
          <form className="contactForm" id="contactForm">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              className="form-control mb-2"
              value={name}
              onChange={(e) => {
                dispatch(
                  setContactForm({ label: e.target.id, value: e.target.value })
                );
              }}
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
              value={email}
              onChange={(e) => {
                dispatch(
                  setContactForm({ label: e.target.id, value: e.target.value })
                );
              }}
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
              value={message}
              onChange={(e) => {
                dispatch(
                  setContactForm({ label: e.target.id, value: e.target.value })
                );
              }}
            />
            <label hidden htmlFor="message">
              Your message.
            </label>
            {contactErrors.message && <JoiErrorNote inputName={"message"} />}

            <div className="text-center">
              {messageSent && (
                <div className="small text-success">
                  Your message has been recieved, thank you.
                </div>
              )}

              <button
                className="btn btn-primary"
                type="submit"
                name="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  setMessageSent(false);
                  sendContactForm({ name, email, message });
                  dispatch(clearContactErrors());
                }}
                disabled={name && email && message ? false : true}
              >
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
