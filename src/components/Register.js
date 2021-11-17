import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { userRegister } from "../actions/userActions";
import PropTypes from "prop-types";
import { signUpSchema } from "../validation/validationSchemas";

const Register = (props) => {
  const { userRegister, userId, isFetching, errors, serverValidationMessage } =
    props;

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
    userId && history.push(`/login`);
  }, [userId]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
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
        <p>{formErrors ? formErrors : serverValidationMessage}</p>
      </div>
      {isFetching && !formErrors && <h3> Loading...</h3>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    isFetching: state.userReducer.isFetching,
    errors: state.userReducer.errors,
    serverValidationMessage: state.userReducer.serverValidationMessage,
  };
};

Register.propTypes = {
  userRegister: PropTypes.func,
  userId: PropTypes.any,
  isFetching: PropTypes.bool,
  errors: PropTypes.string,
  serverValidationMessage: PropTypes.string,
};

export default connect(mapStateToProps, { userRegister })(Register);
