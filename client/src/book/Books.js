import React, { useState, useEffect } from "react";
import Book from "./Book";
import { Button } from "antd";
import BookModal from "./BookModal";
import Search from "../search/Search";
import { Row, Col } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ALL_GENRES } from "../query/GenreQuery";
import { GET_ALL_AUTHORS } from "../query/AuthorQuery";
import { prop, propOr, pathOr } from "ramda";
import { FIND_BOOKS } from "../query/FindBooksQuery";
import Image from "rc-image";
import "../App.css";
import BookInfo from "./BookInfo";
import DeleteModal from "../modal/DeleteModal";
import { useMutation } from "@apollo/client";
import { REMOVE_BOOK } from "../mutation/BookDeleteMutation";

const defaultBook = {
  title: "",
  description: "",
  authorId: null,
  genre: null,
  year: null,
};

const Books = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState(defaultBook);
  const [books, setBooks] = useState([]);
  const [bookParams, setBookParams] = useState({});
  const [isBookSelected, setIsBookSelected] = useState(false);

  const { data: data_genres } = useQuery(GET_ALL_GENRES);
  const { data: data_authors } = useQuery(GET_ALL_AUTHORS);
  const { data, loading, refetch } = useQuery(FIND_BOOKS, {
    variables: { bookParams },
  });

  const [deleteBook, { loading: deleting }] = useMutation(REMOVE_BOOK);

  const remove = () => {
    if (deleting) return;

    deleteBook({
      variables: {
        id: prop("_id", bookToUpdate),
      },
    }).then(() => {
      refetch();
      setIsDeleteModalVisible(false);
    });
  };

  const onDelete = (book) => {
    setBookToUpdate(book);
    setIsDeleteModalVisible(true);
  };

  const authors = propOr([], "getAllAuthors", data_authors);
  const genres = pathOr([], ["getGenres", "genres"], data_genres);

  const showModal = () => {
    setIsBookSelected(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false);
    setBookToUpdate(defaultBook);
  };

  const updateBook = (book) => {
    setBookToUpdate(book);
    showModal();
  };

  const selectBook = (book) => {
    setIsBookSelected(true);
    setBookToUpdate(book);
  };

  useEffect(() => {
    if (!loading) {
      setBooks(propOr([], "findBooksByParams", data));
    }
  }, [data, bookParams]);

  const onSearch = params => {
    setBookToUpdate(defaultBook);
    setIsBookSelected(false);
    setBookParams(params);
  }

  return (
    <div className="main">
      <Search
        authors={authors}
        genres={genres}
        books={books}
        onSearch={onSearch}
      />
      <Row className="books">
        <Col span={11} className="catalogue">
          <h2 id="sub-title">catalogue</h2>

          <Button type="primary" block onClick={showModal}>
            ADD BOOK
          </Button>
          <BookModal
            refetch={refetch}
            book={bookToUpdate}
            isModalVisible={isModalVisible}
            onCancelModal={handleCancel}
            authors={authors}
            genres={genres}
          />

          <DeleteModal
            onConfirm={remove}
            isModalVisible={isDeleteModalVisible}
            onCancelModal={handleCancel}
            text={`Are you sure that you want to delete ${prop(
              "title",
              bookToUpdate
            )} ?`}
          />

          <div>
            {books.map((book, index) => (
              <Book
                key={prop("_id", book)}
                book={book}
                refetch={refetch}
                index={index + 1}
                updateBook={updateBook}
                onSelect={selectBook}
                onDelete={onDelete}
              />
            ))}
          </div>
        </Col>
        <Col span={11} className="img">
          {isBookSelected ? (
            <BookInfo book={bookToUpdate} />
          ) : (
            <Image className="bookImage" src="book-image4.png" />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Books;
