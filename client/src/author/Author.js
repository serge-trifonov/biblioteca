import { REMOVE_AUTHOR } from "../mutation/AuthorDeleteMutation";
import { useMutation } from "@apollo/client";
import { prop } from "ramda";
import {
  DeleteOutlined,
  EditOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";

const Author = ({ author, index, refetch, updateAuthor, onSelect,onDelete}) => {
  
  
  return (
    <div className="author">
      {index}. {author.firstName} {author.lastName}
      <div>
        <DeleteOutlined onClick={()=>onDelete(author)} />
        <EditOutlined onClick={() => updateAuthor(author)} />
        <ZoomInOutlined onClick={() => onSelect(author)} />
      </div>
    </div>
  );
};

export default Author;
