import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import NewGoal from "./components/NewGoal";
import EditGoal from "./components/EditGoal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./App.css";

function App() {
  // const location = useLocation();
  // const savedBackground = localStorage.getItem("goals background");
  // console.log(location);
  // useEffect(() => {
  //   const app = document.getElementById("app");
  //   if (
  //     location.pathname.includes("/profile") ||
  //     location.pathname.includes("/new-goal") ||
  //     location.pathname.includes("/edit-goal")
  //   ) {
  //     app.style.backgroundImage = `url(
  //       ${savedBackground || props.backgroundImage}
  //       )`;
  //   } else if (
  //     location.pathname.includes("/login") ||
  //     location.pathname == "/register"
  //   ) {
  //     app.style.backgroundColor = "green";
  //     // app.style.backgroundImage = "url(./images/rock-climber.jpg)";
  //   } else {
  //     app.style.backgroundColor = "blue";
  //     // app.style.backgroundImage = "url(./images/sunset-climber.jpg)";
  //   }
  // }, [location]);

  return (
    <div className="app">
      {/* style={{
        backgroundImage: `url(${savedBackground || props.backgroundImage})`,
      }} */}
      <Navbar />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/profile/:userId">
        <Profile />
      </Route>
      <Route path="/new-goal/:userId">
        <NewGoal />
      </Route>
      <Route path="/edit-goal/:goalId">
        <EditGoal />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    backgroundImage: state.userReducer.backgroundImage,
  };
};

App.propTypes = {
  backgroundImage: PropTypes.any,
};

export default connect(mapStateToProps)(App);
