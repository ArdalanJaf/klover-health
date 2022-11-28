import React from "react";
import Main from "./components/Main";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stripe from "./components/Stripe";
import Checkout from "./components/Checkout";
import Booking from "./components/Booking";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="success" element={<p>payment sucess</p>} />
          {/* <Route path="cancel" element={<p>payment cancelled</p>} />{" "} */}
          <Route path="admin" element={<Admin />} />{" "}
          <Route path="stripe" element={<Checkout />} />
          <Route
            path="booking/assessment"
            element={<Booking productId={1} />}
          />
          <Route
            path="booking/pre_assessment"
            element={<Checkout productId={2} />}
          />
          {/* <Route path="booking" element={<Stripe/>} */}
          {/* take to same position on main (or purchase page if we have that) */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
