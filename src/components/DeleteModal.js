import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deleteGoal } from "../actions/actions";

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
  const { isModalOpen, setIsModalOpen, deleteGoal } = props;
  const params = useParams();
  const history = useHistory();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteGoal(params.goalId);
    history.goBack();
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Are you sure you want to delete your goal?</h2>
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
};

export default connect(null, { deleteGoal })(DeleteModal);
