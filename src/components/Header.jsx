import React from "react";
import img from "../assets/panoramic-3094350_1920.jpg";

function Header() {
  return (
    <div className="container-max position-relative overflow-hidden headerContainer border-bottom">
      <div className="d-flex w-100 justify-content-center bg-white ">
        <img src={img} alt="English landscape" className="headerImg" />
      </div>

      <div
        className="position-absolute w-100 h-100 text-center d-flex flex-column justify-content-center"
        style={{
          backgroundColor: "rgb(0 0 0 / 18%)",
          maxWidth: "1920px",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <h1
          className="display-3 fw-bold mx-auto text-white md-5 mb-sm-4 "
          style={{ maxWidth: "80%" }}
        >
          Get the NHS mental health support you need.
        </h1>

        {/* call to action */}
        <div>
          <a
            href="#info"
            className="btn btn-lg btn-primary keepBtnShortOnPhone px-4 fw-bold mt-5 mt-sm-0"
            style={{
              boxShadow: "0 1rem 3rem rgb(155 155 155 / 60%) !important",
            }}
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
