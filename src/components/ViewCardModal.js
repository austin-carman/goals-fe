/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
  },
};

Modal.setAppElement("#root");

const ViewCardModal = (props) => {
  const { isModalOpen, setIsModalOpen, goal } = props;
  let stepNumber = 0;
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleEdit = (index) => {
  //   push(`/edit-goal/${goal.goal_id}/${index}`);
  // };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        // onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>{goal.goal_title}</h2>
        <button
          className="goal-card-edit-button"
          onClick={() => handleEdit(index)}
        >
          Edit
        </button>
        {goal.steps.map((step) => {
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
        })}
      </Modal>
    </div>
  );
};

ViewCardModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  goal: PropTypes.object,
};

export default ViewCardModal;
