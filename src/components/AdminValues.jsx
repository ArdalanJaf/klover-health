import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../config/API_URL";
import { setContact } from "../redux/adminSlice";

function AdminValues() {
  const { prices, contact, timeSlots } = useSelector((state) => state.admin);
  const [localContact, setLocalContact] = useState({});
  const dispatch = useDispatch();

  const getAdminContact = async () => {
    try {
      const results = await axios.get(API_URL + "/admin_contact");
      dispatch(setContact(results.data.result[0]));
      console.log(results.data.result[0]);
    } catch (error) {
      alert("API down " + error);
    }
  };

  const setAdminContact = async (payload) => {
    try {
      const results = await axios.post(API_URL + "/admin_contact", payload);
      console.log(results.data.status === 1 ? "changed" : "failed");
    } catch (error) {
      alert("API down " + error);
    }
  };

  // retrieve mutable properties
  useEffect(() => {
    getAdminContact();
  }, []);

  return (
    <div>
      <p>email: {contact.email}</p>
      <p>phone: {contact.phone}</p>
      <p>pre-assesment: £{prices.preAssessment}</p>
      <p>assesment: £{prices.assessment}</p>

      <form
        id="adminForm"
        onInput={(e) => {
          let lCCopy = localContact;
          lCCopy[e.target.id] = e.target.value;
          if (e.target.value.length < 1) delete lCCopy[e.target.id];
          setLocalContact(lCCopy);
          console.log(localContact);
        }}
      >
        <label>
          Email:
          <input type="text" name="email" id="email" />
        </label>
        <label>
          Phone Number:
          <input type="text" name="tel" id="phone" />
        </label>
        <button
          type="submit"
          name="submit"
          onClick={(e) => {
            e.preventDefault();
            setAdminContact(localContact);
          }}
        >
          CHANGE CONTACT
        </button>
      </form>
    </div>
  );
}

export default AdminValues;
