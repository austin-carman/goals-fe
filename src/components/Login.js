import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogin } from "../actions/userActions";
import { loginSchema } from "../validation/validationSchemas";

const Login = (props) => {
  const history = useHistory();
  useEffect(() => {
    props.token && history.push(`/profile/${props.userId}`);
  }, [props.token]);

  const initialState = {
    username: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidation(loginForm);
    props.userLogin(loginForm);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="text"
        name="username"
        value={loginForm.username}
        onChange={handleChange}
        placeholder="username"
      />
      <input
        type="text"
        name="password"
        value={loginForm.password}
        onChange={handleChange}
        placeholder="password"
      />
      <button onClick={handleSubmit}>Sign In</button>
      <div>
        <p>{formErrors}</p>
      </div>
      {props.isFetching && formErrors === "" && <h3> Loading...</h3>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.userReducer.isFetching,
    userId: state.userReducer.userId,
    token: state.userReducer.token,
  };
};

Login.propTypes = {
  isFetching: PropTypes.any,
  userId: PropTypes.any,
  token: PropTypes.any,
  userLogin: PropTypes.func,
};

export default connect(mapStateToProps, { userLogin })(Login);
