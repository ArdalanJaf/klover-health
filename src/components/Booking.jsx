import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Checkout from "./Checkout";

function Booking({ productId }) {
  return (
    <div className="container-max" id="main">
      <Nav />
      <Checkout productId={productId} />
    </div>
  );
}

export default Booking;
