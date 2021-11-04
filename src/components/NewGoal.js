import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { sendNewGoal } from "../actions/actions";

const NewGoal = () => {
  const initialState = {
    goal_title: "",
    steps: [],
  };
  const [goal, setGoal] = useState(initialState);
  const history = useHistory();
  const params = useParams();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "goal_title") {
      setGoal({ ...goal, [name]: value });
    }
    if (name === "step_title" || name === "step_notes") {
      let newGoal = { ...goal };
      let newSteps = [...goal.steps];
      newSteps[index][name] = value;
      newGoal.steps = newSteps;
      setGoal(newGoal);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleAddStep = () => {
    let newGoal = { ...goal };
    newGoal.steps = [...goal.steps, { step_title: "", step_notes: "" }];
    setGoal(newGoal);
  };

  const handleRemoveStep = (index) => {
    let newGoal = { ...goal };
    newGoal.steps.splice(index, 1);
    setGoal(newGoal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newGoal = { ...goal };
    newGoal.steps = [...goal.steps.filter((step) => step.step_title !== "")];
    axiosWithAuth()
      .post(
        `https://goalmanager.herokuapp.com/api/goals/new-goal/${params.userId}`,
        newGoal
      )
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        history.push(`/profile/${params.userId}`);
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
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Step Title"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="step_notes"
                  value={step.step_notes}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Step Notes"
                />
              </label>
            </div>
          );
        })}
      </form>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleAddStep}>Add Step</button>
      <button onClick={() => handleRemoveStep(goal.steps.length - 1)}>
        Remove Step
      </button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default connect({ sendNewGoal })(NewGoal);
