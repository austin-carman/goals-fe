import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(initialState);
  const [errMessage, setErrMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://goalmanager.herokuapp.com/api/user/login", loginForm)
      .then((res) => {
        if (!res.data.token) {
          setErrMessage("Invalid username or password");
        } else {
          setErrMessage();
          localStorage.setItem("token", res.data.token);
          setIsLoading(false);
          push({
            pathname: `/profile/${res.data.userId}`,
            state: { userId: res.data.userId },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      {errMessage ? <p>{errMessage}</p> : null}
      {isLoading ? <h3>Loading...</h3> : null}
    </div>
  );
};

export default Login;
