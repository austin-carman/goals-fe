import React from "react";
import PropTypes from "prop-types";

const GoalCard = (props) => {
  const { goal } = props;
  let stepCount = 0;

  return (
    <div className="active-goals">
      <h2>{goal.goal_title}</h2>
      {goal.steps.map((step) => {
        const goalStatus =
          step.step_completed === true ? "completed-goal" : "active-goal";
        stepCount += 1;
        return (
          <div key={step.step_id} className={goalStatus}>
            <h3>
              Step {stepCount}: {step.step_title}
            </h3>
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
