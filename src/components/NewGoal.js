import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { sendNewGoal } from "../actions/goalsActions";
import PropTypes from "prop-types";
import { goalValidation } from "../validation/validationSchemas";

const NewGoal = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { isFetching, sendNewGoal, error, serverValidateMessage } = props;

  const initialState = {
    goal_title: "",
    steps: [],
  };

  const [goal, setGoal] = useState(initialState);
  const [formErrors, setFormErrors] = useState(null);

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
  };

  const handleRemoveStep = (index) => {
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
    <div className="new-goal-container">
      <h2>Create Your New Goal</h2>
      <form className="new-goal-form" onSubmit={onSubmit}>
        <label className="new-goal-title">
          Goal:{" "}
          <input
            className="new-goal-title input"
            type="text"
            name="goal_title"
            value={goal.goal_title}
            onChange={handleChange}
            placeholder="Goal Title"
          />
        </label>
        {goal.steps.map((step, index) => {
          return (
            <div className="new-steps-container" key={`${step}-${index}`}>
              <label className="new-steps-label">Step {index + 1}:</label>
              <div className="new-step-inputs-container">
                <input
                  className="new-step-input"
                  type="text"
                  name="step_title"
                  value={step.step_title}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Step Title"
                />
                <textarea
                  className="new-step-input"
                  type="text"
                  name="step_notes"
                  value={step.step_notes}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Step Notes"
                />
              </div>
              <button
                className="remove-step-buttons"
                onClick={() => handleRemoveStep(index)}
              >
                Remove Step
              </button>
            </div>
          );
        })}
        <button className="add-step-button" onClick={handleAddStep}>
          Add Step
        </button>
      </form>
      <p className="new-goal-errors">{formErrors}</p>
      <div className="cancel-submit-container">
        <button className="cancel-submit-buttons" onClick={handleCancel}>
          Cancel
        </button>
        <button className="cancel-submit-buttons" onClick={handleSubmit}>
          Save
        </button>
      </div>
      {isFetching && <p>Loading...</p>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.goalsReducer.isFetching,
    error: state.goalsReducer.error,
    serverValidateMessage: state.goalsReducer.serverValidateMessage,
  };
};

NewGoal.propTypes = {
  isFetching: PropTypes.bool,
  sendNewGoal: PropTypes.func,
  error: PropTypes.any,
  serverValidateMessage: PropTypes.string,
};

export default connect(mapStateToProps, { sendNewGoal })(NewGoal);
