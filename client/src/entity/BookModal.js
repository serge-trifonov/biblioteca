import React from 'react';
import { Modal, Button } from 'antd';
import { useForm } from "react-hook-form";
import BookForm from './BookForm';

const BookModal = ({ book, isModalVisible, onCancelModal }) => {
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
    return (
      <div>
      <Modal title="Basic Modal" visible={isModalVisible} onCancel={onCancelModal}>
        <BookForm/>
      </Modal>
      </div>
    );
  };
  
  export default BookModal;