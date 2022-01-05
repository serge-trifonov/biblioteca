import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_AUTHOR } from "../mutation/AuthorMutation";
import { UPDATE_AUTHOR } from "../mutation/AuthorUpdateMutation";
import { prop, dissoc } from "ramda";
import React, { useEffect } from "react";

const AuthorForm = ({ author, onCancelModal, refetch, isUpdate }) => {
  const handleDone = () => {
    refetch();
    onCancelModal();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: author });

  useEffect(() => {
    reset(author);
  }, [author]);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  const [newAuthor] = useMutation(ADD_AUTHOR);

  console.log("author", author);
  console.log("isupdate", isUpdate);

  const onSubmit = (data) => {
    if (isUpdate) {
      const id = prop("_id", data);
      const author = dissoc("_id", data);
      updateAuthor({
        variables: {
          id,
          author,
        },
      }).then(() => {
        handleDone();
      });
    } else {
      newAuthor({
        variables: {
          author: data,
        },
      }).then(() => {
        handleDone();
      });
    }
  };

  return (
    <div className="createForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>FIRST NAME</div>
        <input {...register("firstName", { required: true })} />
        <div>LAST NAME</div>
        <input {...register("lastName", { required: true })} />
        <div>COUNTRY</div>
        <input {...register("country", { required: true })} />

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;
