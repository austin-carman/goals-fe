import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

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

const DeleteModal = ({ isModalOpen, setIsModalOpen }) => {
  const history = useHistory();
  const params = useParams();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    axiosWithAuth()
      .delete(
        `https://goalmanager.herokuapp.com/api/goals/delete-goal/${params.goalId}`
      )
      .then((res) => {
        if (res.data === 1) {
          closeModal();
          history.goBack();
        } else {
          closeModal();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
  isModalOpen: PropTypes.boolean,
  setIsModalOpen: PropTypes.any,
  setErrMessage: PropTypes.any,
};

export default DeleteModal;
