import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <h1>Klover Health</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse,
        distinctio!
      </p>
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
