import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const GoalCard = (props) => {
  const { goal, index } = props;
  const { push } = useHistory();
  let stepNumber = 0;

  const handleEdit = (index) => {
    push(`/edit-goal/${goal.goal_id}/${index}`);
  };

  return (
    <div>
      <h2 className="goal-title">{goal.goal_title}</h2>
      <button onClick={() => handleEdit(index)}>Edit</button>

      {goal.steps.map((step, index) => {
        stepNumber += 1;

        return (
          <div key={`${step.step_id}-${index}`}>
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
  index: PropTypes.number,
};

export default GoalCard;
