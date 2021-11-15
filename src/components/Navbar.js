import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../actions/userActions";

const Navbar = () => {
  const handleSignOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <h2>Goal Tracker</h2>
        <div className="links-container">
          <Link to="/register" className="navlink">
            Create Account
          </Link>
          <Link to="/login" className="navlink">
            Sign In
          </Link>
          <Link to="/profile" className="navlink">
            Profile
          </Link>
          <Link to="/" className="navlink">
            Home
          </Link>
          <Link onClick={handleSignOut} to="/login">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default connect(null, { userLogout })(Navbar);
