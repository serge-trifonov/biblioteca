import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK } from "../mutation/BookMutation";
import { UPDATE_BOOK } from "../mutation/BookUpdateMutation";
import { prop, propEq, dissoc, has } from "ramda";

const BookForm = ({ book, onCancelModal, refetch, authors, genres, isUpdate }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: book });

  useEffect(() => {
    reset(book);
  }, [book]);

  const [newBook] = useMutation(ADD_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);

  const handleDone = () => {
    refetch();
    onCancelModal();
  };

  const onSubmit = (data) => {
    if (isUpdate) {
      const id = prop("_id", data);
      const book = dissoc("_id", data);
      updateBook({
        variables: {
          id,
          book,
        },
      }).then(() => {
        handleDone();
      });
    } else {
      newBook({
        variables: {
          book: data,
        },
      }).then(() => {
        handleDone();
      });
    }
  };

  return (
    <div className="creatBookForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>TITLE</div>
        <input {...register("title", { required: true })} />

        <div>AUTHOR</div>
        <select
          style={{ width: 120 }}
          {...register("authorId", { required: true })}
        >
          <option value=""></option>
          {authors.map((author) => (
            <option
              value={prop("_id", author)}
              selected={propEq("authorId", prop("_id", author), book)}
            >
              {prop("firstName", author)} {prop("lastName", author)}
            </option>
          ))}
        </select>

        <div>GENRE</div>
        <select style={{ width: 120 }} {...register("genre")}>
          <option value=""></option>
          {genres.map((genre) => (
            <option value={genre} selected={propEq("genre", genre, book)}>
              {genre}
            </option>
          ))}
        </select>

        <div>DESCRIPTION</div>
        <input {...register("description")} />

        <div>
          <input type="submit" style={{ margin: "5px 0" }} />
        </div>
      </form>
    </div>
  );
};

export default BookForm;
