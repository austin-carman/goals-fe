import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

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

const ViewCardModal = (props) => {
  console.log("modal here");
  return (
    <div>
      <Modal isOpen={props.isModalOpen} style={customStyles}>
        <h2>Title</h2>
      </Modal>
    </div>
  );
};

ViewCardModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};

export default ViewCardModal;
