import { REMOVE_AUTHOR } from "../mutation/AuthorDeleteMutation";
import { useMutation } from "@apollo/client";
import { prop } from "ramda";
import {
  DeleteOutlined,
  EditOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";

const Author = ({ author, index, refetch, updateAuthor, onSelect }) => {
  const [deleteAuthor, { loading: deleting, error: deleteError }] =
    useMutation(REMOVE_AUTHOR);

  const remove = () => {
    if (deleting) return;

    deleteAuthor({
      variables: {
        id: prop("_id", author),
      },
    }).then(() => {
      refetch();
    });
  };
  return (
    <div className="author">
      {index}. {author.firstName} {author.lastName}
      <div>
        <DeleteOutlined onClick={remove} />
        <EditOutlined onClick={() => updateAuthor(author)} />
        <ZoomInOutlined onClick={() => onSelect(author)} />
      </div>
    </div>
  );
};

export default Author;
