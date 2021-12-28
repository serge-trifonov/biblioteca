import React from 'react';
import { Modal, Button,Select } from 'antd';
import { useForm } from "react-hook-form";
import { GET_ALL_GENRES} from "../query/GenreQuery";
import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from '../query/AuthorQuery';
import {prop, propOr, pathOr} from 'ramda';

const BookForm = ({ book, isModalVisible, onCancelModal }) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const {Option} = Select;

  const onSubmit = data => console.log(data);

  const {data:data_genres,error}=useQuery(GET_ALL_GENRES);
  const {data:data_authors}=useQuery(GET_ALL_AUTHORS);
  const authors = propOr([], "getAllAuthors", data_authors);
  const genres = pathOr([], ["getGenres", "genres"], data_genres);

  console.log(authors)
    return (
      <div className="greenSearchForm">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>TITLE</div>
          <input defaultValue="title" {...register("name")} />

        <div>AUTHOR</div> 
        <select defaultValue="" style={{ width: 120 }} {...register("authorId")}  >
            {authors.map(author =>
                <option value={prop('_id', author)}>{prop('firstName', author)} {prop('lastName', author)}</option>
            )}
        </select>

        <div>GENRE</div> 
        <select defaultValue="" style={{ width: 120 }} {...register("genre")}  >
        {genres.map(genre =>
                <option value={genre}>{genre}</option>
            )}
        </select>

        

        <div>DESCRIPTION</div> 
          <input {...register("age", { required: true })} />

        <div style={{padding:"10px 0"}}>

          <input type="submit" />  
        </div>
        
        </form>
      </div>
    );
  };
  
  export default BookForm;