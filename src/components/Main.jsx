import React, { useState, useEffect } from "react";
import About from "./About";
import ContactForm from "./ContactForm";
import AboutRicha from "./AboutRicha";
import Nav from "./Nav";
import Header from "./Header";
import Products from "./Products";
import Popout from "./Popout";
import Success from "./Success";
import Footer from "./Footer";
import Spacer from "./Spacer";

function Main({ bookingMade }) {
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (bookingMade) setBooked(true);
  }, []);

  return (
    <div className="container-max" id="main">
      {booked && <Popout component={<Success setBooked={setBooked} />} />}
      <Nav />
      <Header />
      <div className="container" style={{ maxWidth: "800px" }}>
        <Spacer linkId="about" />
        <About />
        <Spacer linkId="bookings" />
        <Products />
        <Spacer />
        <AboutRicha />
        <Spacer linkId="contact" />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
