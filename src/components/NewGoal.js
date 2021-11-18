import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendNewGoal } from "../actions/goalsActions";
import PropTypes from "prop-types";
import { newGoalSchema, newStepsSchema } from "../validation/validationSchemas";
// import * as yup from "yup";

const NewGoal = (props) => {
  const { isFetching, error, serverValidateMessage } = props;

  const initialState = {
    goal_title: "",
    steps: [],
  };

  // const initialformErrors = {
  //   goal_title: "",
  //   step_title: "",
  // };

  const [goal, setGoal] = useState(initialState);
  const [goalErrors, setGoalErrors] = useState("");
  const [stepErrors, setStepErrors] = useState("");
  // const [formErrors, setFormErrors] = useState(initialformErrors);

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
    // yup
    //   .reach(newGoalSchema, "goal_title")
    //   .validate(value)
    //   .then(() => {
    //     setFormErrors({ ...formErrors, goal_title: "" });
    //   })
    //   .catch((err) => {
    //     setFormErrors({ ...formErrors, goal_title: err.errors[0] });
    //   });
    // yup
    //   .reach(newStepsSchema, "step_title")
    //   .validate(value)
    //   .then(() => {
    //     setFormErrors({ ...formErrors, step_title: "" });
    //   })
    //   .catch((err) => {
    //     setFormErrors({ ...formErrors, step_title: err.errors[0] });
    //   });
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
    newGoal.steps.forEach((step) => {
      newStepsSchema
        .validate(step)
        .then(() => {
          setStepErrors("");
          if (!goalErrors && !stepErrors) {
            console.log("NO ERRRRRRRS");
          }
        })
        .catch((err) => {
          setStepErrors(err.errors[0]);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newGoal = { ...goal };
    goalValidation(newGoal);
    // sendNewGoal(userId, newGoal);
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
