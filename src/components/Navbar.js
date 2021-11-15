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
        <h2>Goal Tracker</h2>
        <div className="links-container">
          {!props.userId ? (
            <div>
              <Link to="/" className="navlink">
                Home
              </Link>
              <Link to="/register" className="navlink">
                Create Account
              </Link>
              <Link to="/login" className="navlink">
                Sign In
              </Link>
            </div>
          ) : (
            <div>
              <Link to={`/profile/${props.userId}`} className="navlink">
                Profile
              </Link>
              <Link onClick={handleSignOut} to="/login">
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
  };
};

Navbar.propTypes = {
  userLogout: PropTypes.func,
  userId: PropTypes.number,
};

export default connect(mapStateToProps, { userLogout })(Navbar);
