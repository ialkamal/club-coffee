import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CoffeeForm from "./components/CoffeeForm";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/order/coffee/" component={CoffeeForm} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
