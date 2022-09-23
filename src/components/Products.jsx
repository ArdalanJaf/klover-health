import React from "react";
import styled from "styled-components";

function Products() {
  return (
    <StyledProducts>
      <div>
        <h3>Assessment</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
          quaerat sint recusandae doloribus voluptate accusamus nostrum cum modi
          est magni?
        </p>
      </div>
    </StyledProducts>
  );
}

export default Products;

const StyledProducts = styled.div`
  width: 100vw;
  background-color: #38d4e6;
  display: flex;
  flex-wrap: wrap;
`;
