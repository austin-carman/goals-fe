import React, { useState } from "react";

const NewGoal = () => {
  const initialState = {
    goal_title: "",
  };
  const [goal, setGoal] = useState(initialState);
  const [steps, setSteps] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const handleStepChange = (i, e) => {
    const { name, value } = e.target;
    let newSteps = [...steps];
    newSteps[i][name] = value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { step_title: "", step_notes: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newGoal = {};
    steps.length > 0
      ? (newGoal = { ...goal, steps: steps })
      : (newGoal = { ...goal });
    console.log(newGoal);
  };

  // need to be able to remove step input field

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
        {steps.map((step, i) => {
          return (
            <div key={`${step}-${i}`}>
              <label>
                Step {i + 1}:
                <input
                  type="text"
                  name="step_title"
                  value={step.step_title}
                  onChange={(e) => handleStepChange(i, e)}
                  placeholder="Step Title"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="step_notes"
                  value={step.step_notes}
                  onChange={(e) => handleStepChange(i, e)}
                  placeholder="Step Notes"
                />
              </label>
            </div>
          );
        })}
      </form>
      <button onClick={handleAddStep}>Add Step</button>
      <button onClick={handleSubmit}>Create Goal</button>
    </div>
  );
};

export default NewGoal;
