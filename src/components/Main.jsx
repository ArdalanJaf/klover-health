import React, { useState, useEffect } from "react";
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

function Main({ bookingMade }) {
  // for successful payment url
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (bookingMade) setBooked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-max" id="main">
      {booked && <Popout component={<Success setBooked={setBooked} />} />}
      <Nav />
      <Header />
      <div className="container" style={{ maxWidth: "800px" }}>
        <Spacer linkId="info" />
        <Info />
        <Spacer linkId="bookings" />
        <Products />
        <Spacer linkId="about" />
        <About />
        <Spacer linkId="contact" />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
