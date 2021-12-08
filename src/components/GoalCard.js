import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { sortSteps } from "../utils/helperFunctions";

const GoalCard = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { goal, index } = props;
  const history = useHistory();
  let completedSteps = 0;

  goal.steps.map((step) => {
    if (step.step_completed) {
      completedSteps += 1;
    }
  });

  console.log(goal);

  const handleViewCard = () => {
    history.push(`/goal-details/${goal.goal_id}`);
  };

  const nextStep = goal.steps.find((step) => step.step_completed === false);

  const sortedSteps = sortSteps([...goal.steps]);
  goal.steps = sortedSteps;

  return (
    <div
      className={
        goal.goal_completed
          ? "completed-goals goal-card-container"
          : "unfinished-goals goal-card-container"
      }
      onClick={handleViewCard}
    >
      <h2 className="card-title">{goal.goal_title}</h2>
      <div>
        <p className="next-step">
          Next Step: {nextStep ? nextStep.step_title : "None"}
        </p>
        <p>
          Steps completed: {completedSteps}/{goal.steps.length}{" "}
        </p>
      </div>
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
  index: PropTypes.number,
};

export default GoalCard;
