import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PayButton from "./PayButton";
import Stripe from "./Stripe";
import formatUTCToString from "../utils/formatUTCToString";
import axios from "axios";
import { API_URL } from "../API/API_URL";
import JoiErrorNote from "./JoiErrorNote";

function Booking({ productId }) {
  const { availableTs } = useSelector((state) => state.admin);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [haveCoupon, setHaveCoupon] = useState(false);
  const [couponCode, setcouponCode] = useState("");
  const [couponErr, setCouponErr] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  const bookingInfo = {
    productId,
    firstName,
    lastName,
    email,
    phone,
    timeslot,
    haveCoupon,
    couponCode,
  };

  const handleCheckout = async (payload) => {
    try {
      const results = await axios.post(API_URL + "/stripe/checkout", payload);
      console.log(results.data);
      if (results.data.validationErrors) {
        setValidationErrors(results.data.validationErrors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div>
        <div className="d-flex mb-3">
          <div className="form-group me-1">
            <label htmlFor="fname" className="form-label mb-1">
              First name:
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="fname"
              name="fname"
              className="form-control"
              type="text"
            />
            {validationErrors.firstName && (
              <JoiErrorNote error={validationErrors.firstName} />
            )}
          </div>
          <div className="form-group ms-1">
            <label htmlFor="lname" className="form-label mb-1">
              Last Name:
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lname"
              name="lname"
              className="form-control"
              type="text"
            />
            {validationErrors.lastName && (
              <JoiErrorNote error={validationErrors.lastName} />
            )}
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group me-1 mb-3">
            <label htmlFor="email" className="form-label mb-1">
              Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              className="form-control"
              type="email"
            />
            {validationErrors.email && (
              <JoiErrorNote error={validationErrors.email} />
            )}
          </div>
          <div className="form-group ms-1">
            <label htmlFor="tel" className="form-label mb-1">
              Phone:
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="tel"
              name="tel"
              className="form-control"
              type="number"
            />
            {validationErrors.phone && (
              <JoiErrorNote error={validationErrors.phone} />
            )}
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="timeslot" className="form-label mb-1">
            Appointment:
          </label>
          <select
            id="timeslot"
            className="form-select"
            onChange={(e) => setTimeslot(Number(e.target.value))}
          >
            <option value={0} label={"Select..."} />
            {availableTs.map((time, i) => {
              return (
                <option key={i} value={time} label={formatUTCToString(time)} />
              );
            })}
          </select>
          {validationErrors.timeslot && (
            <JoiErrorNote error={validationErrors.timeslot} />
          )}
        </div>

        {/* Adds option to add discount code incase user has already paid for initial consultation*/}
        {productId === 1 && (
          <div className="form-group mb-3">
            <input
              id="checkbox"
              type="checkbox"
              value={haveCoupon}
              onChange={() => setHaveCoupon(!haveCoupon)}
            />
            <label htmlFor="checkbox" className="form-text ms-1">
              {"   "}I have already had an initial consultation.
            </label>
            {haveCoupon && (
              <div>
                <label htmlFor="coupon" className="form-label mb-1">
                  Enter discount code to deduct initial consultation cost:
                </label>
                <input
                  value={couponCode}
                  onChange={(e) => {
                    setcouponCode(e.target.value);
                    setCouponErr("");
                  }}
                  id="coupon"
                  className="form-control"
                />
                {validationErrors.coupon && (
                  <JoiErrorNote error={validationErrors.coupon} />
                )}
              </div>
            )}
          </div>
        )}
        {/* <div className="form-group mb-3">
          <label htmlFor="checkbox" className="form-text mb-2 ">
            <input
              id="checkbox"
              type="checkbox"
              className="me-1"
              value={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
            I understand that none of my information will be shared with any
            third parties or stored on this websites database.
          </label>
        </div> */}

        {/* <PayButton
          productId={productId}
          name={name}
          timeslot={timeslot}
          disabled={name && timeslot ? false : true}
          couponCode={checkbox ? couponCode : ""}
          setCouponErr={setCouponErr}
        /> */}
      </div>

      <button
        className="btn btn-primary"
        onClick={() => {
          setValidationErrors("");
          handleCheckout(bookingInfo);
        }}
      >
        Checkout
      </button>

      {/* NEED TO LOAD AFTER COUPON ENTRY TO GENERATE PRICE!! */}
      {/* <Stripe /> */}
    </div>
  );
}

export default Booking;
