import React, { useState } from "react";
import AdminTimeslots from "./AdminTimeslots";
import { useDispatch } from "react-redux";
import AdminUnavailability from "./AdminUnavailability";
import AdminPricing from "./AdminPricing";
import AdminLogin from "./AdminLogin";
import AdminPaymentLink from "./AdminPaymentLink";
import { setLogin } from "../../redux/adminSlice";
import "bootstrap/dist/js/bootstrap.bundle";
import "../../styles/dashboard.css";
import AdminEmail from "./AdminEmail";

const Admin = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(0);

  const handleSignOut = () => {
    setLoggedIn(false);
    dispatch(setLogin({ userId: "", token: "" }));
  };

  return (
    <div className="container-max" id="admin">
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
                <li className="nav-item">
                  <a
                    className={`nav-link ${screen === 4 ? "active" : ""}`}
                    onClick={() => setScreen(4)}
                  >
                    Payment Link
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            role="main"
            className="ms-md-auto col-12 mt-5 mt-md-0 col-md-10 pt-3 px-4"
          >
            <div className="mx-auto mx-md-0" style={{ maxWidth: "600px" }}>
              {loggedIn && screen === 0 && <AdminTimeslots />}
              {loggedIn && screen === 1 && <AdminUnavailability />}
              {loggedIn && screen === 2 && <AdminPricing />}
              {loggedIn && screen === 3 && <AdminEmail />}
              {loggedIn && screen === 4 && <AdminPaymentLink />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
