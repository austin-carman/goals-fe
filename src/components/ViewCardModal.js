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
  const { isModalOpen, setIsModalOpen, goal } = props;
  console.log("modal here");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>{goal.goal_title}</h2>
      </Modal>
    </div>
  );
};

ViewCardModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  goal: PropTypes.object,
};

export default ViewCardModal;
