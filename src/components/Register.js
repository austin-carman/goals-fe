import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Register = () => {
  const initialState = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  };
  const { push } = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [registerForm, setRegisterForm] = useState(initialState);
  const [errMessage, setErrMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://goalmanager.herokuapp.com/api/user/register", registerForm)
      .then((res) => {
        if (res.data.user_id) {
          push("/login");
        } else {
          setErrMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      {errMessage && <p>{errMessage}</p>}
    </div>
  );
};

export default Register;
