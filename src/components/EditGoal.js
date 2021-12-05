import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { editUserGoal } from "../actions/goalsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { goalValidation } from "../validation/validationSchemas";
import addStep from "../images/plus-circle.png";
import deleteStep from "../images/minus-circle.png";

const EditGoal = (props) => {
  const history = useHistory();
  const params = useParams();
  console.log("params: ", params);

  const initialGoalState = {
    goal_title: props.goals[params.index].goal_title,
    goal_completed: props.goals[params.index].goal_completed,
    user_id: props.goals[params.index].user_id,
    goal_id: props.goals[params.index].goal_id,
    steps: props.goals[params.index].steps,
  };

  const initialIsModalOpenState = {
    open: false,
    goalToDelete: {
      goalId: null,
    },
    stepToDelete: {
      stepId: null,
      index: null,
    },
  };

  const [goal, setGoal] = useState(initialGoalState);
  const [formErrors, setFormErrors] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(initialIsModalOpenState);

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

  const handleSave = (e) => {
    e.preventDefault();
    goalValidation(goal)
      .then((validationErrors) => {
        setFormErrors(validationErrors);
        if (!validationErrors) {
          props.editUserGoal(params.goalId, goal);
          history.goBack();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteGoal = (e, id) => {
    e.preventDefault();
    setIsModalOpen({
      ...isModalOpen,
      open: true,
      goalToDelete: { goalId: id },
    });
  };

  const handleDeleteStep = (e, index, id) => {
    e.preventDefault();
    setIsModalOpen({
      ...isModalOpen,
      open: true,
      stepToDelete: { stepId: id, index: index },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2 className="form-title">Edit Goal</h2>
      <form className="goal-form" onSubmit={onSubmit}>
        <div className="top-container">
          {/* <input
            className="completed-checkbox"
            type="checkbox"
            name="goal_completed"
            value={goal.goal_completed}
            checked={goal.goal_completed}
            onChange={(e) => handleChange(e)}
          /> */}
          <div className="icon-label-container">
            <img
              src={deleteStep}
              className="icon"
              onClick={(e) => handleDeleteGoal(e, params.goalId)}
            />
            <div className="label-input-container">
              <label className="goal-label">Goal:</label>
              <input
                className="text-input"
                type="text"
                name="goal_title"
                value={goal.goal_title}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {goal.steps.map((step, index) => {
            return (
              <div className="icon-label-container" key={`${step}-${index}`}>
                {/* <input
                className="completed-checkbox"
                type="checkbox"
                name="step_completed"
                value={step.step_completed}
                checked={step.step_completed}
                onChange={(e) => handleChange(e, index)}
              /> */}
                <img
                  src={deleteStep}
                  className="icon"
                  onClick={(e) => handleDeleteStep(e, index, step.step_id)}
                />
                <div className="label-input-container">
                  <label className="goal-label">Step {index + 1}:</label>
                  <input
                    className="text-input"
                    type="text"
                    name="step_title"
                    value={step.step_title}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Step Title"
                  />
                  <textarea
                    className="text-input"
                    type="text"
                    name="step_notes"
                    value={step.step_notes || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Step Notes"
                  />
                </div>
              </div>
            );
          })}
          <div className="icon-label-container">
            <img src={addStep} className="icon" onClick={handleAddStep} />
            <label className="goal-label">New Step</label>
          </div>
        </div>
        <div className="bottom-container">
          <p className="form-errors">{formErrors}</p>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </form>
      {isModalOpen.open ? (
        <DeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          goal={goal}
          setGoal={setGoal}
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
  deleteStep: PropTypes.func,
  goals: PropTypes.array,
};

export default connect(mapStateToProps, { editUserGoal })(EditGoal);
