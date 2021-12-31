import React, { useState } from 'react';
import Book from './Book';
import {  Button } from 'antd';
import BookModal from './BookModal';

const defaultBook = {
  title: "",
  description: "",
  authorId: null,
  genre: null
};

const Books = ({ books, refetch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState(defaultBook);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setBookToUpdate(defaultBook);
  };

  const updateBook = (book) => {
    console.log("in update book ", book);
    setBookToUpdate(book);
    showModal();
  }

  return (
    <div className="books">
      <h2 >catalogue</h2>
      <Button type="primary" onClick={showModal}>
        ADD BOOK
      </Button>
      <BookModal refetch={refetch} book={bookToUpdate} isModalVisible={isModalVisible} onCancelModal={handleCancel}/>
      <div>
        {books.map((book, i) => (
          <div>
            <Book book={book} refetch={refetch} i={i + 1} updateBook={updateBook}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
