import React, { useState } from 'react';
import Book from './Book';
import {  Button } from 'antd';
import BookModal from './BookModal';

const Books = ({ books, refetch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="books">
      <h2 >catalogue</h2>
      <Button type="primary" onClick={showModal}>
        ADD BOOK
      </Button>
      <BookModal refetch={refetch} book={{}} isModalVisible={isModalVisible} onCancelModal={handleCancel}/>
      <div>
        {books.map((book, i) => (
          <div>
            <Book book={book} i={i + 1}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
