import React from "react";
import PropTypes from "prop-types";

const GoalCard = (props) => {
  const { goal } = props;
  console.log("GoalCard: ", goal);
  return (
    <div>
      <h2>Card: {goal.title}</h2>
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
};

export default GoalCard;
