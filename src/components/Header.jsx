import React from "react";
import styled from "styled-components";
import img from "../assets/panoramic-3094350_1920.jpg";

function Header() {
  return (
    <div
      className="container-fluid bg-image"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* <img src={img} /> */}
      <h3>Get you the attention you need...</h3>
      <p>
        Get an assessment by a fully certified, experienced psychiatrist to get
        NHS mental health assistance faster.
      </p>
      <a href="#products" className="btn btn-primary">
        Book Now
      </a>{" "}
      {/* call to action */}
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
