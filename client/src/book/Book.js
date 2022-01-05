import {
  DeleteOutlined,
  EditOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";

const Book = ({ book, index, onDelete, updateBook, onSelect }) => {
  return (
    <div className="book">
      {index}. "{book.title}" {book.genre}
      <div className="action">
        <DeleteOutlined onClick={() => onDelete(book)} />

        <EditOutlined onClick={() => updateBook(book)} />

        <ZoomInOutlined onClick={() => onSelect(book)} />
      </div>
    </div>
  );
};

export default Book;
