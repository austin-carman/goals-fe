import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../actions/userActions";
import PropTypes from "prop-types";

const Navbar = (props) => {
  const handleSignOut = () => {
    props.userLogout();
    localStorage.removeItem("token");
  };

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <Link to="/" className="home-link">
          <h2>Goal Tracker</h2>
        </Link>
        <div className="links-container">
          <Link to="/login" className="navlink">
            Sign In
          </Link>
          <Link onClick={handleSignOut} to="/" className="navlink">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    token: state.userReducer.token,
  };
};

Navbar.propTypes = {
  userLogout: PropTypes.func,
  userId: PropTypes.number,
  token: PropTypes.any,
};

export default connect(mapStateToProps, { userLogout })(Navbar);
