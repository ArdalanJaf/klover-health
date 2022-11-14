import React from "react";
import axios from "axios";
import { API_URL } from "../API/API_URL";

function PayButton({
  productId,
  name,
  timeslot,
  couponId,
  disabled,
  setCouponErr,
}) {
  const handleCheckout = async (payload) => {
    try {
      const results = await axios.post(API_URL + "/stripe/payment", payload);
      if (results.data.url) {
        // console.log(results.data);
        window.location.href = results.data.url;
      }
      if (results.data.error.param === "discounts[0][coupon]") {
        setCouponErr(results.data.error.raw.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <button
        disabled={disabled}
        className="btn btn-lg btn-primary px-10 shadow"
        type="submit"
        onClick={() => handleCheckout({ productId, name, timeslot, couponId })}
      >
        Checkout
      </button>
    </div>
  );
}

export default PayButton;
