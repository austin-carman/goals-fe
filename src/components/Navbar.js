import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../actions/userActions";
import PropTypes from "prop-types";
import oceanMountains from "../images/ocean-mountains.jpg";
import plants from "../images/plants.jpg";
import balloons from "../images/balloons.jpg";
import desert from "../images/desert.jpg";
import fall from "../images/fall.jpg";
import mountains1 from "../images/mountains1.jpg";
import ocean1 from "../images/ocean1.jpg";
import ocean2 from "../images/ocean2.jpg";
import snow from "../images/snow.jpg";
import { profileBackground } from "../actions/userActions";

const Navbar = (props) => {
  const handleSignOut = () => {
    props.userLogout();
  };

  const handleBackground = (e) => {
    const { value } = e.target;
    props.profileBackground(value);
  };

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <Link to="/" className="home-link">
          <h2>Goal Tracker</h2>
        </Link>
        {props.userId ? (
          <div className="links-container">
            <div className="navlink profile-avatar-container">
              <h3 className="avatar-text">AC</h3>
            </div>
            <div className="profile-menu-options">
              <Link
                to={`/profile/${props.userId}`}
                className="navlink logout-navlink"
              >
                Profile
              </Link>
              <Link
                onClick={handleSignOut}
                to="/"
                className="navlink logout-navlink"
              >
                Logout
              </Link>
              <div className="background-selection-container">
                <p>Profile Background:</p>
                <select
                  value={props.backgroundImage}
                  onChange={handleBackground}
                >
                  <option value={ocean1}>Ocean Sunrise</option>
                  <option value={ocean2}>Tropical Shoreline</option>
                  <option value={oceanMountains}>Tropical Mountains</option>
                  <option value={mountains1}>Mountain Sunset</option>
                  <option value={desert}>Desert</option>
                  <option value={fall}>Fall</option>
                  <option value={snow}>snow</option>
                  <option value={plants}>Plants</option>
                  <option value={balloons}>Balloons</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div id="signed-out-links-container">
            <Link to="/login" className="navlink">
              Sign In
            </Link>
            <Link to="/register" className="navlink" id="sign-up-link">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    backgroundImage: state.userReducer.backgroundImage,
    userId: state.userReducer.userId,
  };
};

Navbar.propTypes = {
  userLogout: PropTypes.func,
  profileBackground: PropTypes.func,
  backgroundImage: PropTypes.any,
  userId: PropTypes.string,
};

export default connect(mapStateToProps, { userLogout, profileBackground })(
  Navbar
);
