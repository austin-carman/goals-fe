import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import NewGoal from "./components/NewGoal";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/profile/:user_id">
        <Profile />
      </Route>
      <Route path="/new-goal/:user_id">
        <NewGoal />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
