import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { sortSteps } from "../utils/helperFunctions";

const GoalCard = (props) => {
  const { goal, index } = props;
  const { push } = useHistory();
  let stepNumber = 0;

  const handleEdit = (index) => {
    push(`/edit-goal/${goal.goal_id}/${index}`);
  };

  const sortedSteps = sortSteps([...goal.steps]);
  goal.steps = sortedSteps;

  return (
    <div
      className={
        goal.goal_completed
          ? "completed-goals goal-card"
          : "unfinished-goals goal-card"
      }
    >
      <div className="goal-header-container">
        <h2 className="goal-title">{goal.goal_title}</h2>
        <button onClick={() => handleEdit(index)}>Edit</button>
      </div>
      {goal.steps.map((step, index) => {
        stepNumber += 1;
        return (
          <div
            key={`${step.step_id}-${index}`}
            className={
              step.step_completed
                ? "completed-steps goal-steps"
                : "unfinished-steps goal-steps"
            }
          >
            <div className="step-title-container">
              <h3 className="step-number">Step {stepNumber}:</h3>
              <h3 className="step-title">{step.step_title}</h3>
            </div>
            {step.step_notes ? (
              <p className="step-notes">Notes: {step.step_notes}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
  index: PropTypes.number,
};

export default GoalCard;
