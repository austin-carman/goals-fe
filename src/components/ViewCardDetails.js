import React, { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { editUserGoal } from "../actions/goalsActions";
import { connect } from "react-redux";
import editIcon from "../icons/edit-icon2.png";

Modal.setAppElement("#root");

const ViewCardDetails = (props) => {
  const { modalIsOpen, setModalIsOpen, goal, editUserGoal } = props;
  const [goalDetails, setGoalDetails] = useState(goal);
  const [changedStatus, setChangedStatus] = useState(false);
  const history = useHistory();
  let stepNumber = 0;

  const handleEdit = () => {
    history.push(`/edit-goal/${goal.goal_id}`);
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
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h6 className="close-details" onClick={closeModal}>
        &times;
      </h6>
      <div className="details-modal">
        <div className="goal-edit-container">
          <div className="details-container view-goal-title-container">
            <input
              className="completed-checkbox"
              type="checkbox"
              name="goal_completed"
              value={goalDetails.goal_completed}
              checked={goalDetails.goal_completed}
              onChange={(e) => handleChange(e)}
            />
            <h2>{goalDetails.goal_title}</h2>
          </div>
          <img
            src={editIcon}
            className="goal-card-edit-button"
            onClick={handleEdit}
          />
        </div>
        {goalDetails.steps.map((step, index) => {
          stepNumber += 1;
          return (
            <div
              className={
                step.step_completed
                  ? "completed-steps details-container"
                  : "unfinished-steps details-container"
              }
              key={step.step_id}
            >
              <input
                className="completed-checkbox"
                type="checkbox"
                name="step_completed"
                value={step.step_completed}
                checked={step.step_completed}
                onChange={(e) => handleChange(e, index)}
              />
              <div className="checkbox-title-container">
                <h3 className="view-goal-step-number">Step {stepNumber}: </h3>
                <h3 className="view-goal-step-title">{step.step_title}</h3>
                {step.step_notes && (
                  <div className="step-info-container">
                    <p className="view-goal-step-notes">
                      Notes: {step.step_notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

ViewCardDetails.propTypes = {
  modalIsOpen: PropTypes.bool,
  setModalIsOpen: PropTypes.func,
  goal: PropTypes.object,
  editUserGoal: PropTypes.func,
};

export default connect(null, { editUserGoal })(ViewCardDetails);
