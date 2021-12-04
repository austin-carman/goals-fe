import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { sendNewGoal } from "../actions/goalsActions";
import PropTypes from "prop-types";
import { goalValidation } from "../validation/validationSchemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

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
          <label className="goal-label new-goal-label">Goal:</label>
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
              <FontAwesomeIcon
                icon={faMinusCircle}
                className="delete-button"
                onClick={() => handleDeleteStep(index)}
              />
              {/* Do Image instead of font Awesome icon */}
              {/* <img /> */}
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
            </div>
          );
        })}
      </form>
      <p className="goal-form-errors">{formErrors}</p>
      <div className="new-step-button">
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="icon"
          onClick={handleAddStep}
        />
        {/* Do Image instead of font Awesome icon */}
        {/* <img /> */}
        <span className="goal-label">New Step</span>
      </div>
      <div className="goal-buttons-container">
        <button className="goal-form-buttons" onClick={handleCancel}>
          Cancel
        </button>
        <button className="goal-form-buttons" onClick={handleSubmit}>
          Save
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
