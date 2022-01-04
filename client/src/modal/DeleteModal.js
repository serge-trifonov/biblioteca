import React from "react";
import { Modal } from "antd";

const DeleteModal = ({ text, isModalVisible, onCancelModal, onConfirm }) => {
  return (
    <div>
      <Modal
        className="delete"
        title="Confirm delete"
        visible={isModalVisible}
        onOk={onConfirm}
        onCancel={onCancelModal}
      >
        <div className="delete-message"> {text}</div>
      </Modal>
    </div>
  );
};
export default DeleteModal;
