import { GET_ALL_AUTHORS } from "../query/AuthorQuery";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Author from "./Author";
import {  Button } from 'antd';
import AuthorModel from "./AuthorModel";

const Authors = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_AUTHORS);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    if (!loading) {
      setAuthors(data.getAllAuthors);
    }
  }, [data]);


  const [isModalVisible, setIsModalVisible] = useState(false);
    
  const showModal = () => {
      setIsModalVisible(true);
    };
  
  const handleCancel = () => {
      setIsModalVisible(false);
  };

  return (
    <div className="authors">
      <h2>authors</h2>
      <Button type="primary" onClick={showModal}>
        ADD AUTHOR
      </Button>
      <AuthorModel refetch={refetch} author={{}} isModalVisible={isModalVisible} onCancelModal={handleCancel}/>
      <div>
        {authors.map((author, index) => (
          <div>
            <Author author={author} refetch={refetch} index={index + 1}/>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Authors;



