import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const DeleteModal = () => {
  return (
    <div>
      <p>Testing</p>
    </div>
  );
};

DeleteModal.propTypes = {
  isModalOpen: PropTypes.boolean,
  setIsModalOpen: PropTypes.any,
};

export default DeleteModal;
