import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deleteGoal } from "../actions/goalsActions";
import { deleteStep } from "../actions/goalsActions";
import { modalStyles } from "../styling/modalStyles";

Modal.setAppElement("#root");

const DeleteModal = (props) => {
  const { isModalOpen, setIsModalOpen, deleteGoal, deleteStep, goal, setGoal } =
    props;
  const history = useHistory();

  const closeModal = () => {
    setIsModalOpen({
      ...isModalOpen,
      open: false,
      goalToDelete: { goalId: null },
      stepToDelete: { stepId: null, index: null },
    });
  };

  const handleDelete = () => {
    if (isModalOpen.goalToDelete.goalId) {
      deleteGoal(isModalOpen.goalToDelete.goalId);
      setIsModalOpen({
        ...isModalOpen,
        open: false,
        goalToDelete: { goalId: null },
      });
      history.goBack();
      return;
    }
    if (isModalOpen.stepToDelete.stepId) {
      deleteStep(isModalOpen.stepToDelete.stepId);
    }
    let newGoal = { ...goal };
    newGoal.steps.splice(isModalOpen.stepToDelete.index, 1);
    setGoal(newGoal);
    setIsModalOpen({
      ...isModalOpen,
      open: false,
      stepToDelete: { stepId: null, index: null },
    });
  };

  return (
    <Modal
      isOpen={isModalOpen.open}
      onRequestClose={closeModal}
      style={modalStyles}
    >
      {isModalOpen.goalToDelete.goalId ? (
        <h2 className="delete-modal-title">
          Are you sure you want to delete your goal?
        </h2>
      ) : (
        <h2 className="delete-modal-title">
          {`Are you sure you want to delete step 
            ${isModalOpen.stepToDelete.index + 1}?`}
        </h2>
      )}
      <div className="delete-modal-btn-container">
        <button className="delete-modal-btn" onClick={closeModal}>
          Cancel
        </button>
        <button className="delete-modal-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = {
  isModalOpen: PropTypes.object,
  setIsModalOpen: PropTypes.func,
  goal: PropTypes.object,
  setGoal: PropTypes.any,
  deleteGoal: PropTypes.func,
  deleteStep: PropTypes.func,
};

export default connect(null, { deleteGoal, deleteStep })(DeleteModal);
