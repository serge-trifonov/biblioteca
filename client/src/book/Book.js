import { REMOVE_BOOK } from "../mutation/BookDeleteMutation";
import { useMutation } from "@apollo/client";
import { prop } from "ramda";
import { DeleteOutlined, EditOutlined ,ZoomInOutlined} from "@ant-design/icons";
import DeleteModal from "../modal/DeleteModal";


const Book = ({ book, index, onDelete, updateBook, onSelect }) => {
  
  return (
    <div className="book">
      {index}. "{book.title}" {book.genre}
      <div className="action">
        <DeleteOutlined onClick={()=>onDelete(book)} />

        <EditOutlined onClick={() => updateBook(book)}/>

        <ZoomInOutlined onClick={() => onSelect(book)}
        />
      </div>
    </div>
  );
};

export default Book;
