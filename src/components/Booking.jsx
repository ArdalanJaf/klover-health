import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { numToPrice } from "../utils/numToPrice";
import PayButton from "./PayButton";

function Booking() {
  const { prices, timeslots } = useSelector((state) => state.admin);

  return (
    <div className="container py-3">
      <div>
        <h3>Assessment</h3>
        <p>£{numToPrice(prices.assessment)}</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
          quaerat sint recusandae doloribus voluptate accusamus nostrum cum modi
          est magni?
        </p>
        <form>
          <label htmlFor="fullName" className="form-label">
            Full name:
          </label>
          <input
            id="fullName"
            name="name"
            className="form-control"
            aria-describedby="nameHelp"
          />

          {/* <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            name="email"
            className="form-control mb-4"
            aria-describedby="nameHelp"
          />

          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            id="phone"
            name="tel"
            className="form-control"
            aria-describedby="nameHelp"
          /> */}
          <div id="nameHelp" className="form-text">
            We'll never share any of your contact info with anyone else.
          </div>

          <label htmlFor="timeslot" className="form-label">
            Select time:
          </label>
          <select id="timeslot" className="form-select">
            {timeslots.map((item) => {
              let date = new Date(item);
              return <option value={item} label={date.toLocaleString()} />;
            })}
          </select>
        </form>
        <PayButton />
      </div>
    </div>
  );
}

export default Booking;

const timeSlots = [
  { day: 0, timeStart: "12:30" },
  { day: 2, timeStart: "16:30" },
  { day: 3, timeStart: "20:30" },
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const StyledBooking = styled.div`
  width: 100vw;
  background-color: #38d4e6;
  display: flex;
  flex-wrap: wrap;
`;

// Item + price
// Description
// name, email, phone number
// choose time
// Checkout button
