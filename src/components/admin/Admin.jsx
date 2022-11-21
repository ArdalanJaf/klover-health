import React, { useEffect, useState } from "react";
import AdminTimeslots from "./AdminTimeslots";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { useDispatch } from "react-redux";
import { setAvailableTs, setTimeslotInfo } from "../../redux/adminSlice";
import AdminUnavailability from "./AdminUnavailability";
import AdminValues from "./AdminValues";
import AdminLogin from "./AdminLogin";
import { setLogin } from "../../redux/adminSlice";
import "bootstrap/dist/js/bootstrap.bundle";
import "./dashboard.css";

const Admin = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(0);

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

  const handleSignOut = () => {
    setLoggedIn(false);
    dispatch(setLogin({ userId: "", token: "" }));
  };

  // useEffect(() => {
  //   getAvailableTimeslots();
  //   getTimeslotInfo();
  // }, []);

  return (
    <div className="container-max">
      <div className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand ms-2" href="#">
          Klover Healthcare
        </a>
        <div className="navbar-nav px-3">
          <div className="nav-item text-nowrap">
            <button
              className="nav-link btn btn-outline-secondary my-1 px-1"
              onClick={handleSignOut}
              disabled={loggedIn ? false : true}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        {!loggedIn && <AdminLogin setLoggedIn={setLoggedIn} />}
        <div className={`row ${!loggedIn ? "d-none" : ""}`}>
          <nav className="col-12 col-md-2 d-block bg-light sidebar px-0">
            <div className="sidebar-sticky">
              <ul className="nav flex-md-column flex-row">
                <li className="nav-item">
                  <a
                    className={`nav-link ${screen === 0 ? "active" : ""}`}
                    onClick={() => setScreen(0)}
                  >
                    Timeslots
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${screen === 1 ? "active" : ""}`}
                    onClick={() => setScreen(1)}
                  >
                    Unavailability
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${screen === 2 ? "active" : ""}`}
                    onClick={() => setScreen(2)}
                  >
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${screen === 3 ? "active" : ""}`}
                    onClick={() => setScreen(3)}
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            role="main"
            className="ms-md-auto col-12 mt-5 mt-md-0 col-md-10 pt-3 px-4"
          >
            {loggedIn && screen === 0 && (
              <AdminTimeslots getTimeslotInfo={getTimeslotInfo} />
            )}
            {loggedIn && screen === 1 && <AdminUnavailability />}
            {/* {loggedIn && <AdminValues />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
