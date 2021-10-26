import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const EditGoal = () => {
  const location = useLocation();
  const history = useHistory();
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

  const handleCancel = () => {
    history.goBack();
  };

  const handleSave = () => {
    console.log("Save");
    axiosWithAuth()
      .put(``, goal)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    console.log("delete");
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
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EditGoal;
