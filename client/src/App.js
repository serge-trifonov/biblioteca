import "./App.css";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "./query/BookQuery";
import Books from "./book/Books";
import "antd/dist/antd.css";
import Search from "./search/Search";
import { Row, Col } from "antd";
import Authors from "./author/Authors";

const App = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_BOOKS);


  const [books, setBooks] = useState([]);

  const [showAuthors, setShowAuthors] = useState(false);

  useEffect(() => {
    if (!loading) {
      setBooks(data.getBooks);
    }
  }, [data]);


  const buttonAuthorBook = showAuthors? "Books":"Authors";
  const onChangePage = () => {setShowAuthors(!showAuthors)}

  return (
    <div className="App">
      <h1>Biblioteca</h1>
      <button onClick={onChangePage}>{buttonAuthorBook}</button>
      {showAuthors&&<Authors />}
      {!showAuthors && 
      <>
      <Search />
        <Row>
        <Col span={11} >
          <Books books={books} refetch={refetch} />
        </Col>
        <Col span={11} className="bookImage">
          book image here
        </Col>
      </Row>
      </>
      }
    </div>
  );
};

export default App;
