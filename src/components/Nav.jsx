import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

function Nav() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light px-2 fixed-top">
      <a className="navbar-brand" href="#">
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
        className={`${isNavCollapsed ? "collapse " : ""} navbar-collapse `}
        id="navbarToggler"
      >
        <div className="navbar-nav mr-auto mt-1 ">
          <a className="nav-link nav-item" href="#">
            About
          </a>
          <a className="nav-link" href="#">
            Bookings
          </a>
          <a className="nav-link nav-item " href="#">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
