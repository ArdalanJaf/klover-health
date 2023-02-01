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
        className="navbar navbar-expand-sm navbar-light bg-light bg-gradient fixed-top"
        style={{
          zIndex: "1",
          maxHeight: "55.99px",
          boxShadow: "inset 0 -1px 0 rgb(0 0 0 / 10%)",
        }}
      >
        <a
          className="navbar-brand fw-bold d-block p-0 d-flex align-items-center ms-2"
          href={URL}
        >
          <img
            src={kloverIcon}
            style={{ maxHeight: "34px" }}
            className="me-1"
            alt="klover healthcare icon"
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
          className={`${
            isNavCollapsed ? "collapse " : ""
          } navbar-collapse w-100`}
          id="navbarToggler"
        >
          <div
            className="navbar-nav mr-auto mt-1 justify-content-end bg-light px-2 text-center"
            style={{ flex: "1" }}
          >
            <a className="nav-link nav-item text-dark" href={URL + "/#info"}>
              Info
            </a>
            <a
              className="nav-link nav-item text-dark"
              href={URL + "/#bookings"}
            >
              Bookings
            </a>
            <a className="nav-link nav-item text-dark" href={URL + "/#about"}>
              About
            </a>
            <a className="nav-link nav-item text-dark" href={URL + "/#contact"}>
              Contact
            </a>
            <a className="nav-link nav-item text-dark" href={URL + "/#faq"}>
              FAQ
            </a>
          </div>
        </div>
      </nav>
      <div style={{ height: "55.99px", width: "100vw" }}></div>
    </>
  );
}

export default Nav;
