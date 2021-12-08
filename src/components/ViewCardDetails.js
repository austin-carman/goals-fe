/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
  },
};

Modal.setAppElement("#root");

const ViewCardDetails = (props) => {
  const { modalIsOpen, setModalIsOpen } = props;
  let stepNumber = 0;

  // const handleEdit = (index) => {
  //   push(`/edit-goal/${goal.goal_id}/${index}`);
  // };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <h2>Goal Title</h2>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
      {/* <div className="goal-card-header-container"> */}
      {/* </div> */}
      {/* <button
          className="goal-card-edit-button"
          onClick={() => handleEdit(index)}
        >
          Edit
        </button> */}
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

ViewCardDetails.propTypes = {
  modalIsOpen: PropTypes.bool,
  setModalIsOpen: PropTypes.func,
};

export default ViewCardDetails;
