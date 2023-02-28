import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogin } from "../actions/userActions";
import { loginSchema } from "../validation/validationSchemas";

const Login = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { userId, token, errors, userLogin, serverValidationMessage } = props;

  const initialState = {
    username: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (token) {
      setFormErrors("");
      history.push(`/profile/${userId}`);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const formValidation = (obj) => {
    loginSchema
      .validate(obj)
      .then(() => {
        setFormErrors("");
      })
      .catch((err) => {
        setFormErrors(err.errors[0]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidation(loginForm);
    userLogin(loginForm);
  };

  // if (errors) {
  //   return (
  //     <h2 className="app-error-message">
  //       We&apos;re currently experiencing an error. Sorry for the inconvenience.
  //     </h2>
  //   );
  // }

  return (
    <div className="login-register-page">
      <div className="sign-in-container">
        <h2>Sign In</h2>
        <input
          type="text"
          name="username"
          value={loginForm.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          placeholder="password"
        />
        <p className="form-errors">
          {formErrors ? formErrors : serverValidationMessage}
        </p>
        <button className="sign-in-button" onClick={handleSubmit}>
          Sign In
        </button>
        <p>Don&apos;t have an account?</p>
        <Link to="/register" className="create-account-link">
          <p>Sign up</p>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    token: state.userReducer.token,
    errors: state.userReducer.errors,
    serverValidationMessage: state.userReducer.serverValidationMessage,
  };
};

Login.propTypes = {
  token: PropTypes.bool,
  userLogin: PropTypes.func,
  errors: PropTypes.string,
  serverValidationMessage: PropTypes.string,
  userId: PropTypes.string,
};

export default connect(mapStateToProps, { userLogin })(Login);
