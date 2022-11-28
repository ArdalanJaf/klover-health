import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectProduct } from "../redux/contactSlice";
import { setAvailableTs } from "../redux/adminSlice";
import axios from "axios";
import { API_URL } from "../API/API_URL";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import JoiErrorNote from "./JoiErrorNote";
import CheckoutForm from "./CheckoutForm";
import formatUTCToString from "../utils/formatUTCToString";
import { numToPrice } from "../utils/numToPrice";
import isLocalTimeUKTime from "../utils/isLocalTimeUKTime";

const stripePromise = loadStripe(
  "pk_test_51LkVjTGLHUbhQyEkySqFAYxPty0Ta0C8FNsBcqxaxQp3IRWMKYnMs8FMKBj2mRTgx1kA1UYLYtVNmq7DyqlNBZ9G00uhBudUDG"
);

function Checkout({ productId }) {
  const { availableTs, prices } = useSelector((state) => state.admin);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponeError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [validationErrors, setValidationErrors] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();

  const price = productId === 1 ? prices.assessment : prices.preAssessment;

  const bookingInfo = {
    productId,
    firstName,
    lastName,
    email,
    phone,
    timeslot,
    couponCode,
  };

  const getAvailableTimeslots = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/timeslots");
      console.log(results);
      dispatch(setAvailableTs(results.data.availableTs));
    } catch (error) {
      console.log("API down " + error);
    }
  };

  useEffect(() => {
    getAvailableTimeslots();
  }, []);

  const checkCoupon = async (payload) => {
    try {
      const results = await axios.post(
        API_URL + "/stripe/check_coupon",
        payload
      );
      console.log(results);
      if (results.data.couponError) {
        setCouponeError(results.data.couponError);
        setCouponDiscount(0);
      }
      if (results.data.discount) {
        setCouponDiscount(results.data.discount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestPaymentIntent = async (payload) => {
    try {
      const results = await axios.post(
        API_URL + "/stripe/create-payment-intent",
        payload
      );
      if (results.data.validationErrors) {
        setValidationErrors(results.data.validationErrors);
      } else {
        setClientSecret(results.data.clientSecret);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // stripe elements
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#007bff",
      colorBackground: "rgba(0,0,0,0)",
      fontSizeBase: "1.1rem",

      // spacingUnit: "3",
      spacingGridRow: "1.1rem",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div
      className="container bg-light rounded-md h-sm-100"
      style={{ maxHeight: "100%", overflowY: "scroll" }}
    >
      <div className="row py-3" style={{ position: "relative" }}>
        {/* Close Button */}
        <button
          style={{ position: "absolute", right: "8px", top: "8px" }}
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => dispatch(selectProduct(""))}
        ></button>

        {/* CART */}
        <div className="col-md-4 order-md-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* <h4 className="text-mute">Your cart</h4> */}
          </div>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">
                  {productId === 2
                    ? " Mental Health Assessment"
                    : "Initial Consultation"}
                </h6>
                {clientSecret && (
                  <small>{formatUTCToString(timeslot, false, true)}</small>
                )}
              </div>
              <span className="text-muted">£{numToPrice(price)}</span>
            </li>
            {couponDiscount > 0 && (
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Discount code</h6>
                </div>
                <span className="text-success">
                  -£{numToPrice(couponDiscount)}
                </span>
              </li>
            )}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>£{numToPrice(price - couponDiscount)}</strong>
            </li>
          </ul>

          {productId === 1 && !clientSecret && (
            <div className="card p-2">
              <div className="input-group">
                <input
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                  }}
                  id="coupon"
                  className="form-control"
                  placeholder="Discount code"
                  disabled={clientSecret || couponDiscount ? true : false}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setCouponeError("");
                      checkCoupon({ couponCode });
                    }}
                    disabled={
                      couponCode && !couponDiscount && !clientSecret
                        ? false
                        : true
                    }
                  >
                    Redeem
                  </button>
                </div>
              </div>
              {couponError && <JoiErrorNote error={couponError} />}
            </div>
          )}
          <hr className="mb-4 d-md-none" />
        </div>

        {/* APPOINTMENT TIME & PERSONAL DETAILS */}
        {!clientSecret && (
          <div className="col-md-8 order-md-1">
            <div>
              {/* appointment time */}
              <h4 className="mb-3">Appointment Slot</h4>
              <div className="mb-3">
                <label htmlFor="timeslot" className="form-label mb-1">
                  Date & time:
                  {!isLocalTimeUKTime() && (
                    <>
                      <br />
                      <small>(in your current timezone)</small>
                    </>
                  )}
                </label>
                <select
                  id="timeslot"
                  className="form-select"
                  onChange={(e) => setTimeslot(Number(e.target.value))}
                  disabled={clientSecret ? true : false}
                >
                  <option value={0} label={"Select..."} />
                  {availableTs.map((time, i) => {
                    return (
                      <option
                        key={i}
                        value={time}
                        label={formatUTCToString(time)}
                      />
                    );
                  })}
                </select>
                {validationErrors.timeslot && (
                  <JoiErrorNote error={validationErrors.timeslot} />
                )}
              </div>

              {/* <hr className="mb-4" /> */}

              {/* Personal Details */}
              <h4 className="mb-3">Personal Details</h4>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName">First name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    type="text"
                    disabled={clientSecret ? true : false}
                  />
                  {validationErrors.firstName && (
                    <JoiErrorNote error={validationErrors.firstName} />
                  )}
                </div>
                <div className="col-md-6 ">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    type="text"
                    disabled={clientSecret ? true : false}
                  />
                  {validationErrors.lastName && (
                    <JoiErrorNote error={validationErrors.lastName} />
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    className="form-control"
                    type="email"
                    disabled={clientSecret ? true : false}
                  />
                  {validationErrors.email && (
                    <JoiErrorNote error={validationErrors.email} />
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="tel">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="tel"
                    name="tel"
                    className="form-control"
                    type="text"
                    disabled={clientSecret ? true : false}
                  />
                  {validationErrors.phone && (
                    <JoiErrorNote error={validationErrors.phone} />
                  )}
                </div>
              </div>

              <hr className="mb-4" />

              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  setValidationErrors("");
                  bookingInfo.couponCode = couponDiscount ? couponCode : "";
                  requestPaymentIntent(bookingInfo);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
        {clientSecret && (
          <div className="col-md-8 order-md-1 stripeFormFix">
            <div
              className="form-control p-0"
              style={{
                border: "none",
                backgroundColor: "rgba(0,0,0,0)",
                // minWidth:
              }}
            >
              <h4 className="mb-3">Payment</h4>
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>

            <div
              className="text-center order-md-3 mt-1"
              onClick={() => setClientSecret("")}
            >
              <i className="bi bi-arrow-left-circle "></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
