import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import DeleteModal from "./DeleteModal";

const EditGoal = () => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  const { userGoal } = location.state;
  const initialState = {
    goal_title: userGoal.goal_title,
    goal_completed: userGoal.goal_completed,
    steps: userGoal.steps,
  };
  const [goal, setGoal] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;

    if (name === "goal_title" || name === "goal_completed") {
      setGoal({ ...goal, [name]: valueToUse });
    }

    if (
      name === "step_title" ||
      name === "step_notes" ||
      name === "step_completed"
    ) {
      let stepEdits = [...goal.steps];
      stepEdits[index][name] = valueToUse;
      setGoal({ ...goal, steps: stepEdits });
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSave = () => {
    const editedGoal = { ...goal };
    editedGoal.steps = [...goal.steps.filter((step) => step.step_title !== "")];
    axiosWithAuth()
      .put(
        `https://goalmanager.herokuapp.com/api/goals/edit/${params.goalId}`,
        editedGoal
      )
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
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

  return (
    <div>
      <form>
        <label>
          Goal Title
          <input
            type="text"
            name="goal_title"
            value={goal.goal_title}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          Goal Completed
          <input
            type="checkbox"
            name="goal_completed"
            value={goal.goal_completed}
            checked={goal.goal_completed}
            onChange={(e) => handleChange(e)}
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
                Notes:
                <input
                  type="text"
                  name="step_notes"
                  value={step.step_notes}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Step Notes"
                />
              </label>
              <label>
                Step Completed
                <input
                  type="checkbox"
                  name="step_completed"
                  value={step.step_completed}
                  checked={step.step_completed}
                  onChange={(e) => handleChange(e, index)}
                />
              </label>
            </div>
          );
        })}
      </form>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={openModal}>Delete</button>
      <button onClick={handleAddStep}>Add Step</button>
      <button onClick={() => handleRemoveStep(goal.steps.length - 1)}>
        Remove Step
      </button>
      {isModalOpen ? (
        <DeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
    </div>
  );
};

export default EditGoal;
