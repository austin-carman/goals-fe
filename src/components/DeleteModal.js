import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deleteGoal } from "../actions/goalsActions";
import { deleteStep } from "../actions/goalsActions";

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
  const { isModalOpen, setIsModalOpen, deleteGoal, deleteStep, goal, setGoal } =
    props;
  const history = useHistory();

  console.log(isModalOpen);

  const closeModal = () => {
    setIsModalOpen(false);
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
    <div>
      <Modal
        isOpen={isModalOpen.open}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {isModalOpen.goalToDelete ? (
          <h2>
            Are you sure you want to permanently delete your goal and all
            associated steps?
          </h2>
        ) : (
          <h2>Are you sure you want to permanently delete your step?</h2>
        )}
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </Modal>
    </div>
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
