import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
