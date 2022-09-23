import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../config/API_URL";

function PayButton({ item, timeSlot, coupon }) {
  const prices = useSelector((state) => state.admin.prices);

  const handleCheckout = async (payload) => {
    try {
      const results = await axios.post(API_URL + "/stripe/payment", payload);
      if (results.data.url) {
        window.location.href = results.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="submit"
        onClick={() => handleCheckout({ item, timeSlot, coupon })}
      >
        Checkout
      </button>
    </>
  );
}

export default PayButton;
