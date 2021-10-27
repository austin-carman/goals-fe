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
  const [goalEdits, setGoalEdits] = useState(initialState);
  const [stepEdits, setStepEdits] = useState(goal.steps);
  const [errMessage, setErrMessage] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setGoalEdits({ ...goal, [name]: value });
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    let newSteps = [...stepEdits];
    newSteps[index][name] = value;
    setStepEdits(newSteps);
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSave = () => {
    const updatedGoal = { ...goalEdits, steps: stepEdits };
    axiosWithAuth()
      .put(
        `https://goalmanager.herokuapp.com/api/goals/edit/${goalEdits.goal_id}`,
        updatedGoal
      )
      .then((res) => {
        if (res.data.goal_id) {
          setErrMessage(null);
          setGoalEdits(res.data);
          history.goBack();
        } else {
          setErrMessage("Please complete all required fields");
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
        {errMessage ? <p>{errMessage}</p> : null}
        <label>
          Goal Title
          <input
            type="text"
            name="goal_title"
            value={goalEdits.goal_title}
            onChange={handleChange}
          />
        </label>
        {goal.steps.map((step, index) => {
          return (
            <div key={`${step}-${index}`}>
              <label>
                Step {index + 1}:
                <input
                  type="text"
                  name="step_title"
                  value={step.step_title}
                  onChange={(e) => handleStepChange(index, e)}
                  placeholder="Step Title"
                />
              </label>
            </div>
          );
        })}
      </form>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EditGoal;
