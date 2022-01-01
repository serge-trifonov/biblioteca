import { GET_ALL_AUTHORS } from "../query/AuthorQuery";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Author from "./Author";
import {  Button } from 'antd';
import AuthorModel from "./AuthorModel";
import { prop } from "ramda";

const Authors = () => {

  const defaultAuthor = {
    firstName: "",
    lastName: ""
    
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
    
  const showModal = () => {
      setIsModalVisible(true);
    };
  
  const handleCancel = () => {
      setIsModalVisible(false);
      setAuthorToUpdate(defaultAuthor)
  };

  const updateAuthor = (author) => {
    setAuthorToUpdate(author);
    showModal();
  }

  return (
    <div className="authors">
      <h2>authors</h2>
      <Button type="primary" onClick={showModal}>
        ADD AUTHOR
      </Button>
      <AuthorModel refetch={refetch} author={authorToUpdate} isModalVisible={isModalVisible} onCancelModal={handleCancel}/>
      <div>
        {authors.map((author, index) => (
            <Author key={prop("_id", author)} author={author} refetch={refetch} updateAuthor={updateAuthor} index={index + 1}/>
        ))}
      </div>
      
    </div>
  );
};

export default Authors;



