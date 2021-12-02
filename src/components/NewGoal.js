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

  if (error) {
    return <h2>We&apos;re currently experiencing an error.</h2>;
  }

  return (
    <div className="new-goal-container">
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
      <p>{formErrors}</p>
      <div className="new-goal-buttons-container">
        <div className="new-goal-step-buttons-container">
          <button className="new-goal-buttons" onClick={handleAddStep}>
            Add Step
          </button>
          {goal.steps.length > 0 && (
            <button
              className="new-goal-buttons"
              onClick={() => handleRemoveStep(goal.steps.length - 1)}
            >
              Remove Step
            </button>
          )}
        </div>
        <div className="new-goal-form-buttons-container">
          <button className="new-goal-buttons" onClick={handleCancel}>
            Cancel
          </button>
          <button className="new-goal-buttons" onClick={handleSubmit}>
            Submit
          </button>
        </div>
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
