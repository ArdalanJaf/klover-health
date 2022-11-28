import React from "react";
import styled from "styled-components";
import img from "../assets/panoramic-3094350_1920.jpg";

function Header() {
  return (
    <div className="container-max position-relative mb-4 overflow-hidden headerContainer">
      <div className="d-flex justify-content-center w-100">
        <img src={img} alt="English landscape" className="headerImg" />
      </div>

      <div className="position-absolute top-0 left-0 w-100 h-100 text-center d-flex flex-column justify-content-center">
        <h1
          className="mb-4 mx-2 mx-sm-5 text-white fs-1 fs-sm-6"
          style={{ textShadow: "black 1px 1px 1px" }}
        >
          Get faster access to the NHS mental health support you need!{" "}
          {/* Accelerate your access to NHS mental health support. */}
        </h1>
        {/* <p>
          Get an assessment by a fully certified psychiatrist to get NHS mental
          health assistance faster.
        </p> */}
        <div>
          <a href="#products" className="btn btn-lg btn-primary shadow-lg">
            Book Now
          </a>
        </div>
        {/* call to action */}
      </div>
    </div>
  );
}

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: blue;
  background-image: url(${img});
  h3 {
    font-size: 1.4em;
    color: #fff;
  }
`;
