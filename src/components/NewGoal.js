import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

const NewGoal = () => {
  const initialState = {
    goal_title: "",
    steps: [],
  };
  const [goal, setGoal] = useState(initialState);

  const { push } = useHistory();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    let newSteps = [...goal.steps];
    newSteps[index][name] = value;
    let newGoal = { ...goal };
    newGoal.steps = newSteps;
    setGoal(newGoal);
  };

  const handleAddStep = () => {
    let addedStep = { ...goal };
    addedStep.steps = [...goal.steps, { step_title: "", step_notes: "" }];
    setGoal(addedStep);
  };

  const handleRemoveStep = (index) => {
    let removedStep = { ...goal };
    removedStep.steps.splice(index, 1);
    setGoal(removedStep);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newGoal = { ...goal };
    let newSteps = [...goal.steps.filter((step) => step.step_title !== "")];
    newGoal.steps = [newSteps];

    axiosWithAuth()
      .post(
        `https://goalmanager.herokuapp.com/api/goals/new-goal/${params.userId}`,
        newGoal
      )
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        push({
          pathname: `/profile/${params.userId}`,
          state: { goal: newGoal },
        });
      })
      .catch((err) => console.log(err));
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
            value={goal.goal_title}
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
      <button onClick={() => handleRemoveStep(goal.steps.length - 1)}>
        Remove Step
      </button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewGoal;
