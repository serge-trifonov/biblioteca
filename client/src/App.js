import "./App.css";
import React, { useState } from "react";
import Books from "./book/Books";
import "antd/dist/antd.css";
import Authors from "./author/Authors";

const App = () => {
  const [showAuthors, setShowAuthors] = useState(false);

  const buttonAuthorBook = showAuthors ? "Books" : "Authors";
  const onChangePage = () => {
    setShowAuthors(!showAuthors);
  };

  return (
    <div className="App">
      <h1>Biblioteca</h1>
      <button onClick={onChangePage}>{buttonAuthorBook}</button>
      {showAuthors && <Authors />}
      {!showAuthors &&  <Books />}
    </div>
  );
};

export default App;
