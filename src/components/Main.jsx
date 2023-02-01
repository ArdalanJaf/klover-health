import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectProduct } from "../redux/publicSlice";
import Nav from "./Nav";
import Header from "./Header";
import Spacer from "./Spacer";
import Info from "./Info";
import Products from "./Products";
import About from "./About";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import Popout from "./Popout";
import Success from "./Success";
import Faq from "./Faq";

function Main({ bookingMade, gpLetter }) {
  const dispatch = useDispatch();
  // for successful payment url
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (bookingMade) setBooked(true);
    if (gpLetter) dispatch(selectProduct(3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-max" id="main">
      {booked && <Popout component={<Success setBooked={setBooked} />} />}
      <Nav />
      <Header />
      <div
        className="container px-3 px-sm-4 px-md-5"
        style={{ maxWidth: "800px" }}
      >
        <Spacer linkId="info" />
        <Info />
        <Spacer linkId="bookings" />
        <Products />
        <Spacer linkId="about" />
        <About />
        <Spacer linkId="contact" />
        <ContactForm />
        <Spacer linkId="faq" />
        <Faq />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
