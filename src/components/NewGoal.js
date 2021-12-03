import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { sendNewGoal } from "../actions/goalsActions";
import PropTypes from "prop-types";
import { goalValidation } from "../validation/validationSchemas";

const NewGoal = (props) => {
  const { sendNewGoal, error } = props;

  const initialState = {
    goal_title: "",
    steps: [],
  };

  const [goal, setGoal] = useState(initialState);
  const [formErrors, setFormErrors] = useState("");

  const history = useHistory();
  const { userId } = useParams();

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
    history.push(`/profile/${userId}`);
  };

  const handleAddStep = () => {
    let newGoal = { ...goal };
    newGoal.steps = [...goal.steps, { step_title: "", step_notes: "" }];
    setGoal(newGoal);
    setFormErrors("");
  };

  const handleDeleteStep = (index) => {
    let newGoal = { ...goal };
    newGoal.steps.splice(index, 1);
    setFormErrors("");
    setGoal(newGoal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goalValidation(goal)
      .then((validationErrors) => {
        setFormErrors(validationErrors);
        if (!validationErrors) {
          sendNewGoal(userId, goal);
          history.push(`/profile/${userId}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  if (error) {
    return <h2>We&apos;re currently experiencing an error.</h2>;
  }

  return (
    <div className="goal-container">
      <h2>Create Your New Goal</h2>
      <form className="goal-form" onSubmit={onSubmit}>
        <div className="goal-title-container">
          <label className="goal-label">Goal:</label>
          <input
            className="goal-title-input"
            type="text"
            name="goal_title"
            value={goal.goal_title}
            onChange={handleChange}
            placeholder="Goal Title"
          />
        </div>

        {goal.steps.map((step, index) => {
          return (
            <div className="steps-container" key={`${step}-${index}`}>
              <label className="goal-label">Step {index + 1}:</label>
              <div className="step-inputs-container">
                <input
                  className="step-title-input"
                  type="text"
                  name="step_title"
                  value={step.step_title}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={`Step ${index + 1} Title`}
                />
                <textarea
                  className="step-notes-input"
                  type="text"
                  name="step_notes"
                  value={step.step_notes}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={`Step ${index + 1} Notes`}
                />
              </div>
              <button
                className="delete-step-button"
                onClick={() => handleDeleteStep(index)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </form>
      <p className="goal-form-errors">{formErrors}</p>
      <div className="goal-buttons-container">
        <button className="goal-form-buttons" onClick={handleAddStep}>
          Add Step
        </button>
        <button className="goal-form-buttons" onClick={handleSubmit}>
          Save
        </button>
        <button className="goal-form-buttons" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.goalsReducer.error,
    serverValidateMessage: state.goalsReducer.serverValidateMessage,
  };
};

NewGoal.propTypes = {
  sendNewGoal: PropTypes.func,
  error: PropTypes.any,
};

export default connect(mapStateToProps, { sendNewGoal })(NewGoal);
