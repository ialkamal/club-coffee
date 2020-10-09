import React from "react";
import styled from "styled-components";

const HomeDiv = styled.div`
  background-image: "../images/coffee.js";
`;

const home = () => {
  return (
    <HomeDiv>
      <h3>Home</h3>
    </HomeDiv>
  );
};

export default home;
