/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const NewGoal = () => {
  const initialState = {
    goal_title: "",
  };
  const [newGoal, setNewGoal] = useState(initialState);

  const handleChange = (e) => {
    console.log("change");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newGoal);
  };

  return (
    <div>
      <h2>New Goal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Goal Title:
          <input
            type="text"
            name="goal_title"
            value={newGoal.goal_title}
            onChange={handleChange}
          />
        </label>
      </form>
      <button>Create Goal</button>
    </div>
  );
};

export default NewGoal;
