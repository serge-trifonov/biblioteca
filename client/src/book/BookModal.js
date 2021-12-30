import React from 'react';
import { Modal } from 'antd';
import BookForm from './BookForm';

const BookModal = ({ book, isModalVisible, onCancelModal, refetch }) => {

    return (
      <div>
      <Modal footer={null} title="CREATE BOOK" visible={isModalVisible} onCancel={onCancelModal}>
        <BookForm onCancelModal={onCancelModal} book={book} refetch={refetch} />
      </Modal>
      </div>
    );
  };
  
  export default BookModal;