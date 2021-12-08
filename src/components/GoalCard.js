/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { sortSteps } from "../utils/helperFunctions";
import ViewCardModal from "./ViewCardModal";

const GoalCard = (props) => {
  const { goal, index } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { push } = useHistory();
  let completedSteps = 0;

  goal.steps.map((step) => {
    if (step.step_completed) {
      completedSteps += 1;
    }
  });

  const nextStep = goal.steps.find((step) => step.step_completed === false);

  const handleViewCard = () => {
    setIsModalOpen(true);
  };

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
      <ViewCardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        goal={goal}
      />
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
  index: PropTypes.number,
};

export default GoalCard;
