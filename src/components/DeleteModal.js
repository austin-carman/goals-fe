import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deleteGoal } from "../actions/actions";
import { deleteStep } from "../actions/actions";

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
    stepToDelete,
    setStepToDelete,
  } = props;
  const params = useParams();
  const history = useHistory();

  const closeModal = () => {
    setStepToDelete("cancel");
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    typeof stepToDelete === "number"
      ? deleteStep(stepToDelete)
      : deleteGoal(params.goalId);
    history.goBack();
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {typeof stepToDelete === "number" ? (
          <h2>Are you sure you want to delete your step?</h2>
        ) : (
          <h2>Are you sure you want to delete your goal?</h2>
        )}
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
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
  stepToDelete: PropTypes.any,
  setStepToDelete: PropTypes.any,
};

export default connect(null, { deleteGoal, deleteStep })(DeleteModal);
