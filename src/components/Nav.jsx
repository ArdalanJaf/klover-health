import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import { URL } from "../API/URL";

function Nav() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light px-2 fixed-top"
        style={{ zIndex: "1" }}
      >
        <a className="navbar-brand" href={URL}>
          Klover Healthcare
        </a>

        <button
          className="navbar-toggler"
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
            <a className="nav-link" href={URL + "/#products"}>
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
