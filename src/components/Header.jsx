import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <h1>Klover Healthcare</h1>
      <p>Providing mental health assessments to get NHS support faster.</p>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: turquoise;
  h1 {
    font-size: 3em;
    color: #fff;
  }
`;
