import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const GoalCard = (props) => {
  const { goal } = props;
  let stepNumber = 0;
  const goalStatus =
    goal.goal_completed === true ? "completed-goal" : "active-goal";

  const { push } = useHistory();
  const handleEdit = () => {
    push({
      pathname: `/edit-goal/${goal.goal_id}`,
      state: { goal: goal },
    });
  };

  return (
    <div className={goalStatus}>
      <h2 className="goal-title">{goal.goal_title}</h2>
      <button onClick={handleEdit}>Edit</button>

      {goal.steps.map((step) => {
        const stepStatus =
          step.step_completed === true ? "completed-step" : "active-step";
        stepNumber += 1;

        return (
          <div key={step.step_id} className={stepStatus}>
            {step.step_title ? (
              <h3 className="step-title">
                Step {stepNumber}: {step.step_title}
              </h3>
            ) : null}
            {step.step_notes ? (
              <p className="step_notes">Notes: {step.step_notes}</p>
            ) : null}
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
