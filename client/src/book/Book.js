const Book = ({ book, i }) => {
  return (
    <div className="book">
      <strong>
        {i}. "{book.title}"{" "}
      </strong>
      {book.description}

      <div>
        <button>delete</button>

        <button>update</button>
      </div>
    </div>
  );
};

export default Book;
