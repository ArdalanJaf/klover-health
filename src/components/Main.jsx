import React from "react";
import About from "./About";
import ContactForm from "./ContactForm";
import AboutRicha from "./AboutRicha";
import Nav from "./Nav";
import Header from "./Header";
import Products from "./Products";

function Main() {
  return (
    <div className="container-max" id="main">
      <Nav />
      <Header />
      <div className="container" style={{ maxWidth: "800px" }}>
        <About />
        <Products />
        <AboutRicha />
        {/* <Booking /> */}
        <ContactForm />
      </div>
    </div>
  );
}

export default Main;

// header
// pull?
// explanation
// about Risha
// book appointment
// contact
// footer
