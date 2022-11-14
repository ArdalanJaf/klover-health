import React, { useEffect, useState } from "react";
import AdminTimeslots from "./AdminTimeslots";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { useDispatch } from "react-redux";
import { setAvailableTs, setTimeslotInfo } from "../../redux/adminSlice";
import AdminExceptions from "./AdminExceptions";
import AdminValues from "./AdminValues";
import AdminLogin from "./AdminLogin";

const Admin = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  const getAvailableTimeslots = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/timeslots");
      //   console.log(results.data);
      dispatch(setAvailableTs(results.data.availableTs));
    } catch (error) {
      // message to tell user to contact Risha directly
      alert("API down " + error);
    }
  };

  const getTimeslotInfo = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/timeslots_info");
      console.log(results.data);
      dispatch(setTimeslotInfo(results.data.timeslotInfo));
    } catch (error) {
      // message to tell user to contact Risha directly
      alert("API down " + error);
    }
  };

  // useEffect(() => {
  //   getAvailableTimeslots();
  //   getTimeslotInfo();
  // }, []);

  return (
    <div className="container">
      {!loggedIn && <AdminLogin setLoggedIn={setLoggedIn} />}
      {loggedIn && <AdminTimeslots getTimeslotInfo={getTimeslotInfo} />}
      {/* {loggedIn && <AdminExceptions />} */}
      {/* {loggedIn && <AdminValues />} */}
    </div>
  );
};

export default Admin;
