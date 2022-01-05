import {
  DeleteOutlined,
  EditOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";

const Author = ({
  author,
  index,
  updateAuthor,
  onSelect,
  onDelete,
}) => {
  return (
    <div className="author">
      {index}. {author.firstName} {author.lastName}
      <div>
        <DeleteOutlined onClick={() => onDelete(author)} />
        <EditOutlined onClick={() => updateAuthor(author)} />
        <ZoomInOutlined onClick={() => onSelect(author)} />
      </div>
    </div>
  );
};

export default Author;
