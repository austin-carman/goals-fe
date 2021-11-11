import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { editUserGoal } from "../actions/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const EditGoal = (props) => {
  const history = useHistory();
  const params = useParams();

  const initialState = {
    goal_title: props.goals[params.index].goal_title,
    goal_completed: props.goals[params.index].goal_completed,
    user_id: props.goals[params.index].user_id,
    goal_id: props.goals[params.index].goal_id,
    steps: props.goals[params.index].steps,
  };

  const [goal, setGoal] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    if (index === undefined) {
      setGoal({ ...goal, [name]: valueToUse });
    } else {
      let stepEdits = [...goal.steps];
      stepEdits[index][name] = valueToUse;
      setGoal({ ...goal, steps: stepEdits });
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleAddStep = () => {
    const newStep = { step_title: "", step_notes: "", step_completed: false };
    let userGoal = { ...goal };
    const steps = [...goal.steps, newStep];
    userGoal.steps = steps;
    setGoal(userGoal);
  };

  const handleRemoveStep = () => {
    const userGoal = { ...goal };
    const editedSteps = [...goal.steps];
    if (editedSteps[editedSteps.length - 1].step_id) {
      const stepId = editedSteps[editedSteps.length - 1].step_id;
      // modal, are you sure?
      // action to remove step
      console.log(stepId);
    }
    editedSteps.pop();
    userGoal.steps = editedSteps;
    setGoal(userGoal);
  };

  const handleSave = () => {
    const editedGoal = { ...goal };
    editedGoal.steps = [...goal.steps.filter((step) => step.step_title !== "")];
    props.editUserGoal(params.goalId, editedGoal);
    history.goBack();
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
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
      <div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleAddStep}>Add Step</button>
        <button onClick={handleRemoveStep}>Remove Step</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={openDeleteModal}>Delete</button>
      </div>
      {isModalOpen ? (
        <DeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    goals: state.goalsReducer.goals,
  };
};

EditGoal.propTypes = {
  editUserGoal: PropTypes.func,
  goals: PropTypes.array,
};

export default connect(mapStateToProps, { editUserGoal })(EditGoal);
