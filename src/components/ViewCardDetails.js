/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { editUserGoal } from "../actions/goalsActions";
import { connect } from "react-redux";

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

const ViewCardDetails = (props) => {
  const { modalIsOpen, setModalIsOpen, goal, goalIndex, editUserGoal } = props;
  const [goalDetails, setGoalDetails] = useState(goal);
  const [changedStatus, setChangedStatus] = useState(false);
  const history = useHistory();
  let stepNumber = 0;

  const handleEdit = (index) => {
    history.push(`/edit-goal/${goal.goal_id}/${index}`);
  };

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    if (index === undefined) {
      setGoalDetails({ ...goalDetails, [name]: valueToUse });
    } else {
      let stepEdits = [...goalDetails.steps];
      stepEdits[index][name] = valueToUse;
      setGoalDetails({ ...goalDetails, steps: stepEdits });
    }
    setChangedStatus(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    changedStatus && editUserGoal(goal.goal_id, goalDetails);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button onClick={closeModal}>Close Modal</button>
        <input
          className="completed-checkbox"
          type="checkbox"
          name="goal_completed"
          value={goalDetails.goal_completed}
          checked={goalDetails.goal_completed}
          onChange={(e) => handleChange(e)}
        />
        <h2>{goalDetails.goal_title}</h2>
        <div className="goal-card-header-container"></div>
        <button
          className="goal-card-edit-button"
          onClick={() => handleEdit(goalIndex)}
        >
          Edit
        </button>
        {goalDetails.steps.map((step, index) => {
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
              <input
                className="completed-checkbox"
                type="checkbox"
                name="step_completed"
                value={step.step_completed}
                checked={step.step_completed}
                onChange={(e) => handleChange(e, index)}
              />
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

ViewCardDetails.propTypes = {
  modalIsOpen: PropTypes.bool,
  setModalIsOpen: PropTypes.func,
  goal: PropTypes.object,
  goalIndex: PropTypes.number,
  editUserGoal: PropTypes.func,
};

export default connect(null, { editUserGoal })(ViewCardDetails);
