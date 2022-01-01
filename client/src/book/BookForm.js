import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { GET_ALL_GENRES } from "../query/GenreQuery";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../query/AuthorQuery";
import { prop, propOr, pathOr, propEq, dissoc, has } from "ramda";
import { ADD_BOOK } from "../mutation/BookMutation";
import { UPDATE_BOOK } from "../mutation/BookUpdateMutation";

const BookForm = ({book, onCancelModal, refetch }) => {
  
  const {
    register,
    handleSubmit,
    reset
  } = useForm({defaultValues: book});

  useEffect(() => {
    reset()
  }, [book]);

  const { data: data_genres, error } = useQuery(GET_ALL_GENRES);
  const { data: data_authors } = useQuery(GET_ALL_AUTHORS);
  const [newBook] = useMutation(ADD_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);

  const authors = propOr([], "getAllAuthors", data_authors);
  const genres = pathOr([], ["getGenres", "genres"], data_genres);

  const handleDone = () => {
      refetch();
      onCancelModal();
  };

  const isUpdate = has("_id", book);

  const onSubmit = (data) => {
    if (isUpdate) {
      const id = prop("_id", data);
      const book = dissoc("_id", data);
      updateBook({
        variables:{
          id,
          book
        }
      }).then(()=>{
        handleDone();
      })
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
            <option value={prop("_id", author)} selected={propEq("authorId", prop("_id", author), book)}>
              {prop("firstName", author)} {prop("lastName", author)}
            </option>
          ))}
        </select>

        <div>GENRE</div>
        <select style={{ width: 120 }} {...register("genre")}>
          <option value=""></option>
          {genres.map((genre) => (
            <option value={genre} selected={propEq("genre", genre, book)}>{genre}</option>
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
