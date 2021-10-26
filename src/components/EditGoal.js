import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const EditGoal = () => {
  const location = useLocation();
  const history = useHistory();
  const { goal } = location.state;
  const initialState = {
    goal_id: goal.goal_id,
    goal_title: goal.goal_title,
    goal_completed: goal.goal_completed,
  };
  const [goalEdit, setGoalEdit] = useState(initialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setGoalEdit({ ...goal, [name]: value });
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSave = () => {
    axiosWithAuth()
      .put(
        `https://goalmanager.herokuapp.com/api/goals/edit/${goalEdit.goal_id}`,
        goalEdit
      )
      .then((res) => {
        if (res.data.goal_id) {
          setGoalEdit(res.data);
          history.goBack();
        }
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
            value={goalEdit.goal_title}
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
