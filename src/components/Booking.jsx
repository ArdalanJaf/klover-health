import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { numToPrice } from "../utils/numToPrice";

function Booking() {
  const { prices, timeSlots } = useSelector((state) => state.admin);

  return (
    <StyledBooking>
      <div>
        <h3>Assessment</h3>
        <p>£{numToPrice(prices.assessment)}</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
          quaerat sint recusandae doloribus voluptate accusamus nostrum cum modi
          est magni?
        </p>
      </div>
    </StyledBooking>
  );
}

export default Booking;

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
