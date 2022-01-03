import { REMOVE_BOOK } from "../mutation/BookDeleteMutation";
import { useMutation } from "@apollo/client";
import { prop } from "ramda";
import { DeleteOutlined, EditOutlined ,ZoomInOutlined} from "@ant-design/icons";
import DeleteModal from "../modal/DeleteModal";


const Book = ({ book, index, refetch, updateBook, onSelect }) => {

  const [deleteBook, { loading: deleting, error: deleteError }] =
    useMutation(REMOVE_BOOK);

  const remove = (book) => {
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
      {index}. "{book.title}" {book.genre}
      <div className="action">
        <DeleteOutlined onClick={console.log("delete")} />

        <EditOutlined onClick={() => updateBook(book)}/>

        <ZoomInOutlined onClick={() => onSelect(book)}
        />
      </div>
    </div>
  );
};

export default Book;
