import React from "react";
import PropTypes from "prop-types";

const GoalCard = (props) => {
  const { goal } = props;
  let stepNumber = 0;
  const goalStatus =
    goal.goal_completed === true ? "completed-goal" : "active-goal";

  return (
    <div className={goalStatus}>
      <h2>{goal.goal_title}</h2>

      {goal.steps.map((step) => {
        const stepStatus =
          step.step_completed === true ? "completed-step" : "active-step";
        stepNumber += 1;

        return (
          <div key={step.step_id} className={stepStatus}>
            {step.step_title ? (
              <h3>
                Step {stepNumber}: {step.step_title}
              </h3>
            ) : null}
            {step.step_notes ? <p>Notes: {step.step_notes}</p> : null}
          </div>
        );
      })}
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
};

export default GoalCard;
