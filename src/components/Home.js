import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HomeDiv = styled.div`
  background-image: url("https://images.unsplash.com/photo-1588618670195-620f6dde8368?ixlib=rb-1.2.1&auto=format&fit=crop&w=1645&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
`;

const OrderTitle = styled.h3`
  color: white;
  text-shadow: 1px 1px black;
  font-size: 2rem;
  margin: auto auto;
  padding-top: 100px;
`;

const OrderButton = styled.button`
  padding: 10px;
  background-color: green;
  color: white;
  font-size: 1.5rem;
  margin-top: 20px;
  border-radius: 20px;
  :hover {
    background-color: white;
    color: green;
  }
`;

const home = () => {
  return (
    <HomeDiv>
      <OrderTitle>Order your mouthwatering coffee here!</OrderTitle>
      <NavLink to="/order/coffee">
        <OrderButton>Order Now!</OrderButton>
      </NavLink>
    </HomeDiv>
  );
};

export default home;
