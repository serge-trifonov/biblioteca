import React from "react";
import { Modal } from "antd";
import BookForm from "./BookForm";
import { has, prop, toUpper } from "ramda";

const BookModal = ({
  book,
  isModalVisible,
  onCancelModal,
  refetch,
  authors,
  genres,
}) => {
  const isUpdate = has("_id", book);
  const title = isUpdate
    ? "UPDATE " + toUpper(prop("title", book))
    : "CREATE BOOK";
  return (
    <div>
      <Modal
        footer={null}
        title={title}
        visible={isModalVisible}
        onCancel={onCancelModal}
      >
        <BookForm
          onCancelModal={onCancelModal}
          isUpdate={isUpdate}
          book={book}
          refetch={refetch}
          authors={authors}
          genres={genres}
        />
      </Modal>
    </div>
  );
};

export default BookModal;
