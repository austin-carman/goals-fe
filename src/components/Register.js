import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { userRegister } from "../actions/userActions";
import PropTypes from "prop-types";
import signUpSchema from "../schema/signUpSchema";
import * as yup from "yup";

const Register = (props) => {
  const history = useHistory();
  useEffect(() => {
    props.userId && history.push(`/login`);
  }, [props.userId]);

  const initialState = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  };

  const initialErrors = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  };

  const [registerForm, setRegisterForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrors);

  const formValidation = (name, value) => {
    yup
      .reach(signUpSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    formValidation(name, value);
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.userRegister(registerForm);
    setRegisterForm(initialState);
  };

  return (
    <div>
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
      <button onClick={handleSubmit}>Register</button>
      <div>
        <p>{formErrors.first_name}</p>
        <p>{formErrors.last_name}</p>
        <p>{formErrors.username}</p>
        <p>{formErrors.password}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    isFetching: state.userReducer.isFetching,
    errors: state.userReducer.errors,
  };
};

Register.propTypes = {
  userRegister: PropTypes.func,
  userId: PropTypes.any,
  isFetching: PropTypes.any,
  errors: PropTypes.any,
  formErrors: PropTypes.func,
};

export default connect(mapStateToProps, { userRegister })(Register);
