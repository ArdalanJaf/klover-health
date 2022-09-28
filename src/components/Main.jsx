import React from "react";
import About from "./About";
import AdminValues from "./AdminValues";
import ContactForm from "./ContactForm";
import Header from "./Header";
import Landing from "./Landing";
import PayButton from "./PayButton";
import Products from "./Products";
import { StyledMain } from "./styles/Main.styled";
import Booking from "./Booking";

function Main() {
  return (
    <div className="container">
      <Header />
      {/* <Landing /> */}
      {/* <About /> */}
      {/* <Products /> */}
      <Booking />
      {/* <ContactForm /> */}
      <AdminValues />
      {/* <PayButton /> */}
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
