import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

const NewGoal = () => {
  const initialState = {
    goal_title: "",
    steps: [],
  };
  const [goal, setGoal] = useState(initialState);
  const [errMessage, setErrMessage] = useState(null);

  const { push } = useHistory();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    let newSteps = [...steps];
    newSteps[index][name] = value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    let newGoal = { ...goal };
    newGoal.steps = [...goal.steps, { step_title: "", step_notes: "" }];
    setGoal(newGoal);
  };

  const handleRemoveStep = (index) => {
    let newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newGoal = {};
    steps.length > 0
      ? (newGoal = { ...goal, steps: steps })
      : (newGoal = { ...goal });
    axiosWithAuth()
      .post(
        `https://goalmanager.herokuapp.com/api/goals/new-goal/${params.userId}`,
        newGoal
      )
      .then((res) => {
        if (res.data.goal_id) {
          setErrMessage(null);
          push(`/profile/${params.userId}`);
        } else {
          setErrMessage(
            "Please fill out all required fields (Goal title, step title (if step exists)."
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>New Goal</h2>
      {errMessage ? <p>{errMessage}</p> : null}
      <form>
        <label>
          Goal Title:
          <input
            type="text"
            name="goal_title"
            value={goal.goal_title}
            onChange={handleChange}
          />
        </label>
        {steps.map((step, index) => {
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
              <label>
                <input
                  type="text"
                  name="step_notes"
                  value={step.step_notes}
                  onChange={(e) => handleStepChange(index, e)}
                  placeholder="Step Notes"
                />
              </label>
            </div>
          );
        })}
      </form>
      <button onClick={handleAddStep}>Add Step</button>
      <button onClick={() => handleRemoveStep(steps.length - 1)}>
        Remove Step
      </button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewGoal;
