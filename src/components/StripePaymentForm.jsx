import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { URL } from "../API/URL";
import { Orbit } from "@uiball/loaders";

export function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [haveSubmit, setHaveSubmit] = useState(false); // incase of multiple purchase attempts from same ip
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    if (haveSubmit) setHaveSubmit(false);
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${URL}/booked`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      console.log(error);
      setMessage(error.message);
    } else {
      console.log(error);
      setMessage("An unexpected error occurred.");
    }

    setHaveSubmit(true);
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      {/* Show any error or success messages */}
      {message && haveSubmit && (
        <small className="text-danger" id="payment-message">
          {message}
        </small>
      )}

      <button
        disabled={!stripe || !elements || isLoading}
        id="submit"
        className="btn btn-primary mt-3 w-100"
      >
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Orbit size={20} color="#fff" />
          </div>
        ) : (
          "Complete Booking"
        )}
      </button>
    </form>
  );
}

export default StripePaymentForm;
