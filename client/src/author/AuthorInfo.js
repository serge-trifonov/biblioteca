import React from "react";
import { prop, propOr, length } from "ramda";
import { useQuery } from "@apollo/client";
import { FIND_BOOKS } from "../query/FindBooksQuery";

const AuthorInfo = ({ author }) => {
  const bookParams = { authorId: prop("_id", author) };

  const { data } = useQuery(FIND_BOOKS, {
    variables: { bookParams },
  });

  const books = propOr([], "findBooksByParams", data);
  const name = prop("firstName", author) + " " + prop("lastName", author);

  const hasBooks = length(books) > 0;

  return (
    <div className="authorInfo">
      <div className="title-book-author">{name}</div>
      <div>
        <strong>COUNTRY:</strong> {author.country}{" "}
      </div>

      {hasBooks ? (
        <strong>List of books</strong>
      ) : (
        <p className="important-message">we don't have any book of {name} !</p>
      )}

      {books.map((e) => (
        <div>{e.title}</div>
      ))}
    </div>
  );
};

export default AuthorInfo;
