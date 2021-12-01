import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendNewGoal } from "../actions/goalsActions";
import PropTypes from "prop-types";

const NewGoal = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { isFetching, sendNewGoal, error, serverValidateMessage } = props;

  const initialState = {
    goal_title: "",
    steps: [],
  };

  const [goal, setGoal] = useState(initialState);
  const [formErrors, setFormErrors] = useState(null);

  // const history = useHistory();
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

  const goalValidation = async (newGoal) => {
    const newSteps = newGoal.steps;
    const errs = {};
    if (newGoal.goal_title.trim() === "") {
      return "Goal Title is required";
    }
    newSteps.forEach((step, index) => {
      if (step.step_title.trim() === "") {
        errs[index + 1] = "Step Title is required fool";
      }
    });

    for (const step in errs) {
      return `Step ${step} is missing step title. Step title is required for all steps`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await goalValidation(goal);
    console.log(validationErrors);
    setFormErrors(validationErrors);
    // !validationErrors && sendNewGoal(userId, newGoal)
  };

  if (error) {
    return <h2>We&apos;re currently experiencing an error.</h2>;
  }

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
      <Link to={`/profile/${userId}`}>
        <button>Cancel</button>
      </Link>
      <button onClick={handleAddStep}>Add Step</button>
      {goal.steps.length > 0 && (
        <button onClick={() => handleRemoveStep(goal.steps.length - 1)}>
          Remove Step
        </button>
      )}
      <button onClick={handleSubmit}>Submit</button>
      <p>{formErrors}</p>
      <p>{serverValidateMessage}</p>
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
