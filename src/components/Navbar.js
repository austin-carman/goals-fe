import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar-header">
      <nav className="navbar">
        <h2>Goal Tracker</h2>
        <div className="nav-links-container">
          <Link to="/register">Create Account</Link>
          <Link to="/login">Sign In</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/">Home</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
