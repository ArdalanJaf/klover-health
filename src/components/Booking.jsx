import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PayButton from "./PayButton";
import emcaToString from "../utils/emcaToString";

function Booking({ productId }) {
  const { prices, availableTs } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [timeslot, setTimeslot] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [couponId, setCouponId] = useState("");
  const [couponErr, setCouponErr] = useState("");

  return (
    <div className="container py-2">
      <div>
        <div className="form-group mb-3">
          <label htmlFor="fullName" className="form-label mb-1">
            Full name:
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fullName"
            name="name"
            className="form-control"
            aria-describedby="nameHelp"
          />
          <div id="nameHelp" className="form-text ms-1">
            Please enter your full name as written on your NHS records.
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
            <option value={undefined} label={"Select..."} />
            {availableTs.map((item, i) => {
              let date = new Date(item);
              // Minimum time in advance people can book? obv not today...
              // do this in back end.
              return <option key={i} value={item} label={emcaToString(date)} />;
            })}
          </select>
        </div>
        {/* Adds option to add discount code incase user has already paid for initial consultation*/}
        {productId === 1 && (
          <div className="form-group mb-3">
            <input
              id="checkbox"
              type="checkbox"
              value={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
            <label htmlFor="checkbox" className="form-text mb-2 ms-1">
              {"   "}I have already had an initial consultation
            </label>
            {checkbox && (
              <div>
                <label htmlFor="coupon" className="form-label mb-1">
                  Enter coupon code to deduct pre-assesment cost:
                </label>
                <input
                  value={couponId}
                  onChange={(e) => {
                    setCouponId(e.target.value);
                    setCouponErr("");
                  }}
                  id="coupon"
                  className="form-control"
                />
                {couponErr.length > 0 && (
                  <p className="alert alert-danger mt-1">
                    {couponErr}. Make sure code is correct or make direct
                    contact.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        <div className="form-group mb-3">
          <label htmlFor="checkbox" className="form-text mb-2 ">
            {/* <input
              id="checkbox"
              type="checkbox"
              className="me-1"
              value={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            /> */}
            None of your personal information will be shared with any individual
            or organisation. Upon purchasing an appointment, your name and
            contact details will be emailed directly to Richa X and Stripe will
            handle your payment details. None of your data will be stored on
            this website's database.
          </label>
        </div>

        <PayButton
          productId={productId}
          name={name}
          timeslot={timeslot}
          disabled={name && timeslot ? false : true}
          couponId={checkbox ? couponId : ""}
          setCouponErr={setCouponErr}
        />
      </div>
    </div>
  );
}

export default Booking;
