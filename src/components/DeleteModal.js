import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deleteGoal } from "../actions/goalsActions";
import { deleteStep } from "../actions/goalsActions";
import { removeStep } from "../utils/helperFunctions";

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

const DeleteModal = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    deleteGoal,
    deleteStep,
    goal,
    setGoal,
    toDelete,
    setToDelete,
  } = props;
  const params = useParams();
  const history = useHistory();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (toDelete === "deleteGoal") {
      deleteGoal(params.goalId);
      setIsModalOpen(false);
      history.goBack();
    } else if (toDelete === "removeStep") {
      const stepToDelete = removeStep(goal);
      deleteStep(stepToDelete.stepId);
      setToDelete(null);
      setGoal(stepToDelete.userGoal);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {isModalOpen.goalToDelete ? (
          <h2>
            Are you sure you want to delete your goal and all associated steps?
          </h2>
        ) : (
          <h2>Are you sure you want to delete your step?</h2>
        )}
        <button onClick={closeModal}>Cancel</button>
        <button id={toDelete} onClick={handleDelete}>
          {`Delete ${toDelete === "removeStep" ? "step" : "goal"}`}
        </button>
      </Modal>
    </div>
  );
};

DeleteModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  setErrMessage: PropTypes.func,
  deleteGoal: PropTypes.func,
  deleteStep: PropTypes.func,
  goal: PropTypes.object,
  setGoal: PropTypes.any,
  toDelete: PropTypes.any,
  setToDelete: PropTypes.any,
};

export default connect(null, { deleteGoal, deleteStep })(DeleteModal);
