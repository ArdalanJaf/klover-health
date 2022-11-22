import React, { useEffect } from "react";
import About from "./About";
import ContactForm from "./ContactForm";
import Nav from "./Nav";
import Header from "./Header";
import PayButton from "./PayButton";
import Products from "./Products";
import { StyledMain } from "./styles/Main.styled";
import Booking from "./Booking";
import axios from "axios";
import { API_URL } from "../API/API_URL";
import { useDispatch } from "react-redux";
import { setAvailableTs, setPrices } from "../redux/adminSlice";
import AboutRicha from "./AboutRicha";

function Main() {
  const dispatch = useDispatch();

  const getAvailableTimeslots = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/timeslots");
      console.log(results);
      dispatch(setAvailableTs(results.data.availableTs));
    } catch (error) {
      // message to tell user to contact Risha directly
      console.log("API down " + error);
    }
  };

  const getPrices = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/prices");
      // console.log(results);
      dispatch(setPrices(results.data.prices));
    } catch (error) {
      console.log("API down " + error);
    }
  };

  useEffect(() => {
    getAvailableTimeslots();
    getPrices();
  }, []);

  return (
    <div className="container-max">
      <Nav />
      <Header />
      <About />
      <Products />
      <AboutRicha />
      {/* <Booking /> */}
      <ContactForm />
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
