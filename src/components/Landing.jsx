import React from "react";
import styled from "styled-components";

function Landing() {
  return (
    <StyledLanding className="container-fluid">
      <h3>Get you the attention you need...</h3>
      <p>
        Get an assessment by a fully certified, experienced psychiatrist to get
        NHS mental health assistance faster.
      </p>
      <button className="btn btn-primary">Book Now</button>{" "}
      {/* call to action */}
    </StyledLanding>
  );
}

export default Landing;

const StyledLanding = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: blue;
  h3 {
    font-size: 1.4em;
    color: #fff;
  }
`;
