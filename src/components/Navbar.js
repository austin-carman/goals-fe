import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../actions/userActions";
import PropTypes from "prop-types";
import oceanSunset from "../images/ocean-sunset.jpg";
import oceanMountains from "../images/ocean-mountains.jpg";
import guitar from "../images/guitar.jpg";
import library from "../images/library.jpg";
import plants from "../images/plants.jpg";
import wood from "../images/wood.jpg";
import { profileBackground } from "../actions/userActions";

const Navbar = (props) => {
  const handleSignOut = () => {
    props.userLogout();
    localStorage.removeItem("token");
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
        {localStorage.getItem("token") ? (
          <div className="links-container">
            <div
              to={`/profile/${props.userId}`}
              className="navlink profile-avatar-container"
            >
              <h3 className="avatar-text">AC</h3>
            </div>
            <div className="profile-menu-options">
              <Link
                onClick={handleSignOut}
                to="/"
                className="navlink logout-navlink"
              >
                Logout
              </Link>
              <div>
                <p>Select a background</p>
                <select
                  value={props.backgroundImage}
                  onChange={handleBackground}
                >
                  <option value={oceanSunset}>Shoreline Sunset</option>
                  <option value={oceanMountains}>
                    Tropical Mountains and Ocean
                  </option>
                  <option value={guitar}>Guitar</option>
                  <option value={library}>Library</option>
                  <option value={plants}>Plants</option>
                  <option value={wood}>Wood</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="links-container">
            <Link to="/login" className="navlink">
              Sign In
            </Link>
            <Link to="/register" className="navlink">
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
    userId: state.userReducer.userId,
    token: state.userReducer.token,
    backgroundImage: state.userReducer.backgroundImage,
  };
};

Navbar.propTypes = {
  userLogout: PropTypes.func,
  userId: PropTypes.number,
  token: PropTypes.any,
  profileBackground: PropTypes.func,
  backgroundImage: PropTypes.any,
};

export default connect(mapStateToProps, { userLogout, profileBackground })(
  Navbar
);
