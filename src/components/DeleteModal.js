import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const DeleteModal = ({ isModalOpen, setIsModalOpen }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log("delete");
    closeModal();
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
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
};

export default DeleteModal;
