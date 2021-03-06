import React, { useState } from "react";
import PropTypes from "prop-types";
import { sortSteps } from "../utils/helperFunctions";
import ViewCardDetails from "./ViewCardDetails";

const GoalCard = (props) => {
  const { goal } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let completedSteps = 0;

  goal.steps.map((step) => {
    if (step.step_completed) {
      completedSteps += 1;
    }
  });

  const openModal = () => {
    setModalIsOpen(true);
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
    >
      <div className="card-content-container" onClick={openModal}>
        <h2 className="card-title">{goal.goal_title}</h2>
        <div>
          <div>
            <p className="next-step">
              Next: {nextStep ? nextStep.step_title : "None"}
            </p>
            <p>
              Steps completed: {completedSteps}/{goal.steps.length}{" "}
            </p>
          </div>
        </div>
      </div>
      <ViewCardDetails
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        goal={goal}
      />
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
};

export default GoalCard;
