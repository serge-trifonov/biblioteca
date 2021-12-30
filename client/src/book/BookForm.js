import React from "react";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import { GET_ALL_GENRES } from "../query/GenreQuery";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../query/AuthorQuery";
import { prop, propOr, pathOr } from "ramda";
import { ADD_BOOK } from "../mutation/BookMutation";

const BookForm = ({ book, onCancelModal, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: data_genres, error } = useQuery(GET_ALL_GENRES);
  const { data: data_authors } = useQuery(GET_ALL_AUTHORS);
  const authors = propOr([], "getAllAuthors", data_authors);
  const genres = pathOr([], ["getGenres", "genres"], data_genres);

  const [newBook] = useMutation(ADD_BOOK);
  const onSubmit = (data) => {
    newBook({
      variables: {
        book: data,
      },
    }).then(({ data }) => {
      reset({ title: "", genre: "", authorId: "", description: "" });
      refetch();
      onCancelModal();
    });
  };

  return (
    <div className="creatBookForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>TITLE</div>
        <input {...register("title", { required: true })} />

        <div>AUTHOR</div>
        <select
          defaultValue=""
          style={{ width: 120 }}
          {...register("authorId", { required: true })}
        >
          <option value=""></option>
          {authors.map((author) => (
            <option value={prop("_id", author)}>
              {prop("firstName", author)} {prop("lastName", author)}
            </option>
          ))}
        </select>

        <div>GENRE</div>
        <select defaultValue="" style={{ width: 120 }} {...register("genre")}>
          <option value=""></option>
          {genres.map((genre) => (
            <option value={genre}>{genre}</option>
          ))}
        </select>

        <div>DESCRIPTION</div>
        <input {...register("description")} />

        <div>
          <input type="submit" className="btn" />
        </div>
      </form>
    </div>
  );
};

export default BookForm;
