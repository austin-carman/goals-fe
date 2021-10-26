import React, { useState } from "react";

const NewGoal = () => {
  const initialState = {
    goal_title: "",
  };
  const [goal, setGoal] = useState(initialState);
  const [steps, setSteps] = useState([{ step_title: "" }]);

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
    setSteps([...steps, { step_title: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(goal);
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
        {steps.map((step, i) => {
          return (
            <div key={`${step}-${i}`}>
              <label>
                New Step:
                <input
                  type="text"
                  name="step_title"
                  value={step.step_title}
                  onChange={(e) => handleStepChange(i, e)}
                  placeholder="Step Title"
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
