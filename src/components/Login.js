import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogin } from "../actions/userActions";

const Login = (props) => {
  const initialState = {
    username: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(initialState);
  // const [errMessage, setErrMessage] = useState();
  // const [isLoading, setIsLoading] = useState(false); // change to isFetching from app state
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true); // isFetching
    props.userLogin(loginForm);
    localStorage.getItem("token") && history.push(`/profile/${props.userId}`);

    // axios
    //   .post("https://goalmanager.herokuapp.com/api/user/login", loginForm)
    //   .then((res) => {
    //     if (!res.data.token) {
    //       setErrMessage("Invalid username or password");
    //       // setIsFetching(false);
    //     } else {
    //       setErrMessage();
    //       localStorage.setItem("token", res.data.token);
    //       setIsLoading(false); // setIsFetching(false);
    // push(`/profile/${res.data.userId}`);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setLoginForm(initialState);
  };

  return (
    <div>
      <h2>Sign-In</h2>
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
      <button onClick={handleSubmit}>Sign-In</button>
      {/* {errMessage ? <p>{errMessage}</p> : null} */}
      {/* {isLoading ? <h3>Loading...</h3> : null} isFetching */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.userReducer.isFetching,
    userId: state.userReducer.userId,
  };
};

Login.propTypes = {
  isFetching: PropTypes.any,
  userId: PropTypes.any,
  userLogin: PropTypes.func,
};

export default connect(mapStateToProps, { userLogin })(Login);
