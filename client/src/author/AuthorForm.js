import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_AUTHOR } from "../mutation/AuthorMutation";


const AuthorForm = ({ author, onCancelModal, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();




  const [newAuthor] = useMutation(ADD_AUTHOR);
  const onSubmit = (data) => {
    newAuthor({
      variables: {
        author: data,
      },
    }).then(({ data }) => {
      reset({ firstName: "", lastName: ""});
      refetch();
      onCancelModal();
    });
  };

  return (
    <div className="createForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>FIRST NAME</div>
        <input {...register("firstName", { required: true })} />
        <div>LAST NAME</div>
        <input {...register("lastName", { required: true })} />

        <div>
          <input type="submit" className="btn" />
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;