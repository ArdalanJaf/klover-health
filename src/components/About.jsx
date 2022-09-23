import React from "react";
import styled from "styled-components";

function About() {
  return (
    <StyledAbout>
      <h2>About Richa</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem culpa
        hic magnam officiis molestiae adipisci quia eos alias deleniti.
        Blanditiis repudiandae exercitationem deleniti reiciendis perspiciatis,
        facere maiores optio eos dolorem totam impedit beatae sequi aliquid
        quisquam, accusantium autem laborum, animi quos. Enim, voluptate
        consectetur voluptates earum quia aut ipsam nesciunt.
      </p>
      <p>link to linkedin?</p>
    </StyledAbout>
  );
}

export default About;

const StyledAbout = styled.div`
  width: 100vw;
  background-color: red;

  h2 {
    margin: 0;
  }
`;
