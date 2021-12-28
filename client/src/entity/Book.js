import { useState } from "react";

const Book = ({book,i}) => {

  return (
    <div>
      
      <div className="book">
        <strong>{i}. "{book.title}" </strong>{book.description}
      </div>
    </div>
  );
};

export default Book;