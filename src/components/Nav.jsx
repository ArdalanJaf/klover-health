import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import { URL } from "../API/URL";
import kloverIcon from "../assets/kloverIcon.svg";

function Nav() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light ps-2 fixed-top"
        style={{ zIndex: "1", maxHeight: "55.99px" }}
      >
        <a
          className="navbar-brand fw-bold d-block p-0 d-flex align-items-center"
          href={URL}
        >
          <img
            src={kloverIcon}
            style={{ maxHeight: "34px" }}
            className="me-1"
          />
          Klover Healthcare
        </a>

        <button
          className="navbar-toggler me-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse " : ""} navbar-collapse`}
          id="navbarToggler"
        >
          <div
            className="navbar-nav mr-auto mt-1 justify-content-end"
            style={{ flex: "1" }}
          >
            <a className="nav-link nav-item" href={URL + "/#about"}>
              About
            </a>
            <a className="nav-link" href={URL + "/#bookings"}>
              Bookings
            </a>
            <a className="nav-link nav-item " href={URL + "/#contact"}>
              Contact
            </a>
          </div>
        </div>
      </nav>
      <div style={{ height: "55.99px", width: "100vw" }}></div>
    </>
  );
}

export default Nav;
