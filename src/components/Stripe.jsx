import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { API_URL } from "../API/API_URL";

const stripePromise = loadStripe(
  "pk_test_51LkVjTGLHUbhQyEkySqFAYxPty0Ta0C8FNsBcqxaxQp3IRWMKYnMs8FMKBj2mRTgx1kA1UYLYtVNmq7DyqlNBZ9G00uhBudUDG"
);

function Stripe({ bookingInfo }) {
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async (payload) => {
    try {
      const results = await axios.post(
        API_URL + "/stripe/create-payment-intent",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setClientSecret(results.data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createPaymentIntent(bookingInfo);
  }, []);

  const options = {};

  return (
    <div className="form-control">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Stripe;
