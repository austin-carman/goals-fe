import React, { useState } from "react";

const NewGoal = () => {
  const initialState = {
    goal_title: "",
  };
  const [newGoal, setNewGoal] = useState(initialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("submitted");
  };

  return (
    <div>
      <h2>New Goal</h2>
      <form>
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
      <button onClick={handleSubmit}>Create Goal</button>
    </div>
  );
};

export default NewGoal;
