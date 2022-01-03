import { GET_ALL_AUTHORS } from "../query/AuthorQuery";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Author from "./Author";
import { Button } from "antd";
import AuthorModel from "./AuthorModel";
import { prop } from "ramda";
import AuthorInfo from "./AuthorInfo";
import { Row, Col } from "antd";
import Image from "rc-image";

const Authors = () => {
  const defaultAuthor = {
    firstName: "",
    lastName: "",
    country: "",
  };

  const { data, loading, refetch } = useQuery(GET_ALL_AUTHORS);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    if (!loading) {
      setAuthors(data.getAllAuthors);
    }
  }, [data]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authorToUpdate, setAuthorToUpdate] = useState(defaultAuthor);
  const [isAuthorSelected, setIsAuthorSelected] = useState(false); //nous dit s'il y a un auteur selectionné

  const showModal = () => {
    setIsAuthorSelected(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAuthorToUpdate(defaultAuthor);
  };

  const updateAuthor = (author) => {
    setAuthorToUpdate(author);
    showModal();
  };

  const selectAuthor = (author) => {
    setAuthorToUpdate(author); // quel auteur on veut voir dans l'info
    setIsAuthorSelected(true); // boolean qui dit qu'il faut afficher l'info de l'auteur
  };

  return (
    <Row>
      <Col span={11} className="catalogue">
        <h2 id="sub-title">authors</h2>
        <Button type="primary" block onClick={showModal}>
          ADD AUTHOR
        </Button>
        <AuthorModel
          refetch={refetch}
          author={authorToUpdate}
          isModalVisible={isModalVisible}
          onCancelModal={handleCancel}
        />
        <div>
          {authors.map((author, index) => (
            <Author
              key={prop("_id", author)}
              author={author}
              refetch={refetch}
              updateAuthor={updateAuthor}
              index={index + 1}
              onSelect={selectAuthor}
            />
          ))}
        </div>
      </Col>
      <Col span={11}>
        {isAuthorSelected ? (
          <AuthorInfo author={authorToUpdate} />
        ) : (
          <Image className="bookImage" src="image69.jpg" />
        )}
      </Col>
    </Row>
  );
};

export default Authors;
