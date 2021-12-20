import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { sendNewGoal } from "../actions/goalsActions";
import PropTypes from "prop-types";
import { goalValidation } from "../validation/validationSchemas";
import addStep from "../icons/plus-circle.png";
import deleteStep from "../icons/minus-circle.png";

const NewGoal = (props) => {
  const { sendNewGoal, error } = props;
  const savedBackground = localStorage.getItem("goals background");
  const history = useHistory();
  const { userId } = useParams();
  const initialState = {
    goal_title: "",
    steps: [],
  };

  const [goal, setGoal] = useState(initialState);
  const [formErrors, setFormErrors] = useState("");

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

  const handleCancel = (e) => {
    e.preventDefault();
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
    return (
      <h2 className="app-error-message">
        We&apos;re currently experiencing an error.
      </h2>
    );
  }

  return (
    <div
      className="new-edit-goal-form-container"
      style={{
        backgroundImage: `url(${savedBackground || props.backgroundImage})`,
      }}
    >
      <form className="goal-form" onSubmit={onSubmit}>
        <h6 className="close-details close-form" onClick={handleCancel}>
          &times;
        </h6>
        <h2 className="form-title">Create Your New Goal</h2>
        <div className="icon-label-container">
          <div className="icon"></div>
          <div className="label-input-container">
            <label className="goal-label">Goal:</label>
            <input
              className="text-input"
              type="text"
              name="goal_title"
              value={goal.goal_title}
              onChange={handleChange}
              placeholder="Goal Title"
            />
          </div>
        </div>
        {goal.steps.map((step, index) => {
          return (
            <div className="icon-label-container" key={`${step}-${index}`}>
              <img
                src={deleteStep}
                className="icon"
                onClick={() => handleDeleteStep(index)}
              />
              <div className="label-input-container">
                <label className="goal-label">Step {index + 1}:</label>
                <input
                  className="text-input"
                  type="text"
                  name="step_title"
                  value={step.step_title}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={`Step ${index + 1} Title`}
                />
                <textarea
                  className="text-input"
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
        <div className="icon-label-container">
          <img src={addStep} className="icon" onClick={handleAddStep} />
          <label className="goal-label">New Step</label>
        </div>
        <div className="bottom-container">
          <p className="form-errors">{formErrors}</p>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.goalsReducer.error,
    backgroundImage: state.userReducer.backgroundImage,
  };
};

NewGoal.propTypes = {
  sendNewGoal: PropTypes.func,
  error: PropTypes.any,
  backgroundImage: PropTypes.any,
};

export default connect(mapStateToProps, { sendNewGoal })(NewGoal);
