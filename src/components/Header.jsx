import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <h1>Klover Health</h1>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: turquoise;
  h1 {
    font-size: 3em;
    color: #fff;
  }
`;
