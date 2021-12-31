import { REMOVE_BOOK } from "../mutation/BookDeleteMutation";
import { useMutation } from "@apollo/client";
import { prop } from "ramda";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import BookModal from "./BookModal";

const Book = ({ book, i, refetch, updateBook }) => {

  const [deleteBook, { loading: deleting, error: deleteError }] =
    useMutation(REMOVE_BOOK);

  const remove = () => {
    if (deleting) return;

    deleteBook({
      variables: {
        id: prop("_id", book),
      },
    }).then(() => {
      refetch();
    });
  };

  return (
    <div className="book">
      {i}. "{book.title}" {book.description}
      <div>
        <DeleteOutlined onClick={remove} />

        <EditOutlined onClick={() => updateBook(book)}/>
      </div>
    </div>
  );
};

export default Book;
