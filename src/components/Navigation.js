import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigationDiv = styled.div`
  width: 100%;
  background: green;
  display: flex;
  justify-content: flex-end;
  height: 4rem;
  align-items: center;
  a {
    text-decoration: none;
    margin-right: 3%;
    color: white;
    font-size: 1.4rem;
  }
`;

const Navigation = () => {
  return (
    <NavigationDiv>
      <Link to="/order/coffee">Order</Link>
      <Link to="/">Home</Link>
    </NavigationDiv>
  );
};

export default Navigation;
