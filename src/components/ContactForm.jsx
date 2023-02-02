import React, { useState, useEffect } from "react";
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
import { Orbit } from "@uiball/loaders";

function ContactForm() {
  const contactErrors = useSelector((state) => state.public.contactErrors);
  const { name, email, message, tel } = useSelector(
    (state) => state.public.contactForm
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  // Send user-inputs to back-end.
  const sendContactForm = async (payload) => {
    try {
      const result = await axios.post(API_URL + "/contact", payload);
      console.log(result.data);
      // notify user that API is down, advise to email me.
      if (result.data.status === 0) {
        console.log("API error: " + result.data.error);

        // notify user of validation errors
      } else if (result.data.contactErrors) {
        dispatch(setContactErrors(result.data.contactErrors));
        setIsLoading(false);
      } else {
        // reset form and notify user message has been sent
        dispatch(clearContactForm());
        setIsLoading(false);
        setMessageSent(true);
      }
    } catch (error) {
      console.log("API down " + error);
    }
  };

  const handleSubmit = (e, payload) => {
    e.preventDefault();
    setIsLoading(true);
    setMessageSent(false);
    sendContactForm(payload);
    dispatch(clearContactErrors());
  };

  // remove message sent confirmation if user uses form again
  useEffect(() => {
    if (
      messageSent === true &&
      (name.length > 0 || email.length > 0 || message.length > 0)
    ) {
      setMessageSent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, name, message]);

  return (
    <div className="container-max mx-2 mx-sm-5 mx-md-0" id="contact">
      <h2 className="text-center mb-4">Get In Touch</h2>
      <div className="row">
        <div className="col-12 col-md-6 order-md-2 text-center mt-md-4 mb-4">
          <p>
            If you have any questions or enquieries please send a message
            through this contact form and we will get back to you as soon as
            possible.
          </p>
          <p>
            If you are requesting a free pre-assessment phone call, please
            include your availability in the message (eg. "mon 5pm-7pm, weds
            11am-4pm").
          </p>
        </div>
        <div className="col-12 col-md-6 order-md-1">
          <form className="contactForm" id="contactForm">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              className="form-control"
              value={name}
              onChange={(e) => {
                dispatch(
                  setContactForm({
                    label: e.target.id,
                    value: e.target.value,
                  })
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
              className="form-control mt-2"
              value={email}
              onChange={(e) => {
                dispatch(
                  setContactForm({
                    label: e.target.id,
                    value: e.target.value,
                  })
                );
              }}
            />
            {contactErrors.email && (
              <JoiErrorNote error={contactErrors.email} />
            )}
            <label hidden htmlFor="email">
              Your email address.
            </label>

            <input
              type="tel"
              name="tel"
              id="tel"
              placeholder="Your phone number"
              className="form-control mt-2"
              value={tel}
              onChange={(e) => {
                dispatch(
                  setContactForm({
                    label: e.target.id,
                    value: e.target.value,
                  })
                );
              }}
            />
            {contactErrors.tel !== undefined && (
              <JoiErrorNote error={contactErrors.tel} />
            )}
            <label hidden htmlFor="name">
              Your name.
            </label>

            {/* <div className="col-12 mt-2">
                <input
                  type="text"
                  name="times"
                  id="times"
                  placeholder="Availability eg: 'mon 11am-5pm, tues 5.30pm-8pm'"
                  className="form-control"
                  value={times}
                  onChange={(e) => {
                    dispatch(
                      setContactForm({
                        label: e.target.id,
                        value: e.target.value,
                      })
                    );
                  }}
                />
                {contactErrors.name !== undefined && (
                  <JoiErrorNote error={contactErrors.name} />
                )}
                <label hidden htmlFor="name">
                  Your name.
                </label>
              </div> */}

            <textarea
              className="textbox form-control mt-2"
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
            {contactErrors.message && (
              <JoiErrorNote error={contactErrors.message} />
            )}

            <div className="text-center mt-2">
              {messageSent && (
                <div className="small text-success mb-2">
                  Your message has been recieved, thank you.
                </div>
              )}

              <button
                className="btn btn-primary shadow"
                type="submit"
                name="submit"
                onClick={(e) => {
                  handleSubmit(e, { name, email, tel, message });
                }}
                disabled={name && email && message ? false : true}
              >
                {isLoading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Orbit size={20} color="#fff" />
                  </div>
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
