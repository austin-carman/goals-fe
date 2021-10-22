import React from "react";
import PropTypes from "prop-types";

const GoalCard = (props) => {
  const { goal } = props;

  return (
    <div>
      <h2>{goal.goal_title}</h2>
      {goal.steps.map((step) => {
        return <p key={step.step_id}>{step.step_title}</p>;
      })}
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
};

export default GoalCard;
