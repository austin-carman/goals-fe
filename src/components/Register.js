import React, { useState } from "react";

const Register = () => {
  const initialState = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  };
  // eslint-disable-next-line no-unused-vars
  const [registerForm, setRegisterForm] = useState(initialState);

  const handleChange = () => {
    console.log("handleChange");
  };

  const handleSubmit = () => {
    console.log("handleSubmit");
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
      <button onClick={handleSubmit}>Sign-In</button>
    </div>
  );
};

export default Register;
