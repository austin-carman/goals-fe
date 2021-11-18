import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendNewGoal } from "../actions/goalsActions";
import PropTypes from "prop-types";
// import { newGoalSchema } from "../validation/validationSchemas";
import { newGoalSchema, newStepsSchema } from "../validation/validationSchemas";

const NewGoal = (props) => {
  const { isFetching, sendNewGoal, error, serverValidateMessage } = props;

  const initialState = {
    goal_title: "",
    steps: [],
  };

  const [goal, setGoal] = useState(initialState);
  const [goalErrors, setGoalErrors] = useState("");
  const [stepErrors, setStepErrors] = useState("");

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

  const goalValidation = (newGoal) => {
    newGoalSchema
      .validate(newGoal)
      .then(() => {
        setGoalErrors("");
      })
      .catch((err) => {
        setGoalErrors(err.errors[0]);
      });
  };

  const stepValidation = (newSteps) => {
    newStepsSchema
      .validate(newSteps)
      .then(() => {
        setStepErrors("");
      })
      .catch((err) => {
        setStepErrors(err.errors[0]);
      });
  };

  console.log("FORM: ", goalErrors, stepErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newGoal = { ...goal };
    goalValidation(goal);
    goal.steps.length > 0 && stepValidation(goal.steps[0]);
    sendNewGoal(userId, newGoal);
  };

  if (error) {
    return (
      <h2>
        We&apos;re currently experiencing an error. Sorry for the inconvenience.
      </h2>
    );
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
      <p>{goalErrors}</p>
      <p>{stepErrors}</p>
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
  error: PropTypes.string,
  serverValidateMessage: PropTypes.string,
};

export default connect(mapStateToProps, { sendNewGoal })(NewGoal);
