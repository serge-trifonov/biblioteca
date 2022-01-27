import "./App.css";
import React, { useState } from "react";
import Books from "./book/Books";
import "antd/dist/antd.css";
import Authors from "./author/Authors";
import { Button, Image } from "antd";

const App = () => {
  const [showAuthors, setShowAuthors] = useState(false);

  const buttonAuthorBook = showAuthors ? "BOOKS" : "AUTHORS";
  const onChangePage = () => {
    setShowAuthors(!showAuthors);
  };

  return (
    <div className="App">
      <h1 className="biblio-title">
        Biblioteca <Image className="mini-img" src="book-img.png" />
      </h1>
      <Button type="primary" onClick={onChangePage}>
        {buttonAuthorBook}
      </Button>
      {showAuthors && <Authors />}
      {!showAuthors && <Books />}
    </div>
  );
};

export default App;
