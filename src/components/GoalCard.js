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
  // let stepNumber = 0;

  goal.steps.map((step) => {
    if (step.step_completed) {
      completedSteps += 1;
    }
  });

  const nextStep = goal.steps.find((step) => step.step_completed === false);

  const handleViewCard = () => {
    console.log("view Card");
    setIsModalOpen(true);
  };

  // const handleEdit = (index) => {
  //   push(`/edit-goal/${goal.goal_id}/${index}`);
  // };

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
      {/* onClick={() => handleEdit(index)} */}
      {/* <div className="goal-card-header-container"> */}
      <h2 className="card-title">{goal.goal_title}</h2>
      <div>
        <p className="next-step">
          Next Step: {nextStep ? nextStep.step_title : "None"}
        </p>
        <p>
          Steps completed: {completedSteps}/{goal.steps.length}{" "}
        </p>
      </div>
      {/* <button
        className="goal-card-edit-button"
        onClick={() => handleEdit(index)}
      >
        Edit
      </button> */}
      {/* </div> */}
      {/* {goal.steps.map((step) => {
        stepNumber += 1;
        return (
          <div
            key={step.step_id}
            className={
              step.step_completed
                ? "goal-card-completed-steps goal-card-step-container"
                : "goal-card-unfinished-steps goal-card-step-container"
            }
          >
            <div className="goal-card-step-title-container">
              <h3 className="goal-card-step-number">Step {stepNumber}:</h3>
              <h3 className="goal-card-step-title">{step.step_title}</h3>
            </div>
            {step.step_notes ? (
              <p className="goal-card-step-notes">Notes: {step.step_notes}</p>
            ) : null}
          </div>
        );
      })} */}
      <ViewCardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ViewCardModal>
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
  index: PropTypes.number,
};

export default GoalCard;
