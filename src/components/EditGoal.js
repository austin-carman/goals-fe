import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EditGoal = () => {
  const location = useLocation();
  const { goal_title, steps } = location.state.goal;
  const initialState = {
    goal_title: goal_title,
    steps: steps,
  };
  const [goal, setGoal] = useState(initialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setGoal({ ...goal, [name]: value });
  };

  return (
    <div>
      <form>
        <label>
          Goal Title
          <input
            type="text"
            name="goal_title"
            value={goal.goal_title}
            onChange={handleChange}
          />
        </label>
      </form>
      <button>Save</button>
      <button>Cancel</button>
      <button>Delete</button>
    </div>
  );
};

export default EditGoal;
