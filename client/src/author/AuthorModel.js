import React from "react";
import { Modal } from "antd";
import { has, toUpper, prop } from "ramda";

import AuthorForm from "./AuthorForm";

const AuthorModel = ({ author, isModalVisible, onCancelModal, refetch }) => {
  const isUpdate = has("_id", author);
  const title = isUpdate
    ? "UPDATE " + prop("firstName", author) + " " + prop("lastName", author)
    : "CREATE AUTHOR";

  return (
    <div>
      <Modal
        footer={null}
        title={title}
        visible={isModalVisible}
        onCancel={onCancelModal}
      >
        <AuthorForm
          onCancelModal={onCancelModal}
          author={author}
          refetch={refetch}
          isUpdate={isUpdate}
        />
      </Modal>
    </div>
  );
};

export default AuthorModel;
