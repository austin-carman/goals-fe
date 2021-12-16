import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { userRegister } from "../actions/userActions";
import PropTypes from "prop-types";
import { signUpSchema } from "../validation/validationSchemas";

const Register = (props) => {
  const { userRegister, userId, errors, serverValidationMessage } = props;

  const initialState = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  };

  const [registerForm, setRegisterForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      formErrors("");
      history.push(`/profile`);
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const formValidation = (obj) => {
    signUpSchema
      .validate(obj)
      .then(() => {
        setFormErrors("");
      })
      .catch((err) => {
        setFormErrors(err.errors[0]);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formValidation(registerForm);
    userRegister(registerForm);
  };

  if (errors) {
    return (
      <h2>
        We&apos;re currently experiencing an error. Sorry for the inconvenience.
      </h2>
    );
  }

  return (
    <div className="login-register-page">
      <div className="sign-in-container">
        <h2>Create Account</h2>
        <input
          type="text"
          name="first_name"
          value={registerForm.first_name}
          onChange={handleChange}
          placeholder="First name"
        />
        <input
          type="text"
          name="last_name"
          value={registerForm.last_name}
          onChange={handleChange}
          placeholder="Last name"
        />
        <input
          type="text"
          name="username"
          value={registerForm.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="text"
          name="password"
          value={registerForm.password}
          onChange={handleChange}
          placeholder="password"
        />
        <p className="form-errors">
          {formErrors ? formErrors : serverValidationMessage}
        </p>
        <button onClick={handleSubmit}>Register</button>
        <p>Already have an account?</p>
        <Link to="/login" className="create-account-link">
          <p>Sign in</p>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    errors: state.userReducer.errors,
    serverValidationMessage: state.userReducer.serverValidationMessage,
  };
};

Register.propTypes = {
  userRegister: PropTypes.func,
  errors: PropTypes.string,
  userId: PropTypes.number,
  serverValidationMessage: PropTypes.string,
};

export default connect(mapStateToProps, { userRegister })(Register);
