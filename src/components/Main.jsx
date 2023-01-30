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
import Booking from "./Booking";
import Faq from "./Faq";
function Main({ bookingMade, gpLetter }) {
  // for successful payment url
  const [booked, setBooked] = useState(false);
  const [bookLetter, setBookLetter] = useState(false);

  useEffect(() => {
    if (bookingMade) setBooked(true);
    if (gpLetter) setBookLetter(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-max" id="main">
      {booked && <Popout component={<Success setBooked={setBooked} />} />}
      {bookLetter && <Popout component={<Booking productId={3} />} />}
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
        <Spacer linkId="faq" />
        <Faq />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
