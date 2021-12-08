/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";

const ViewCardDetails = () => {
  let stepNumber = 0;

  const handleEdit = (index) => {
    push(`/edit-goal/${goal.goal_id}/${index}`);
  };

  return (
    <div>
      <div className="goal-card-header-container">
        <h2>Goal Title</h2>
        <button
          className="goal-card-edit-button"
          onClick={() => handleEdit(index)}
        >
          Edit
        </button>
      </div>
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
    </div>
  );
};

export default ViewCardDetails;
