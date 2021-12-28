import React, { useState } from 'react';
import Book from "./Book";
import { Modal, Button } from 'antd';
import BookModal from './BookModal';

const Books = ({ books }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>CATALOGUE</h2>
      <Button type="primary" onClick={showModal}>
        ADD BOOK
      </Button>
      <BookModal book={{}} isModalVisible={isModalVisible} onCancelModal={handleCancel}/>
      <div>
        {books.map((book, i) => (
          <div>
            <Book book={book} i={i + 1} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
