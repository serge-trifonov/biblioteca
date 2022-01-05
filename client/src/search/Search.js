import "antd/dist/antd.css";
import { useForm } from "react-hook-form";
import { prop, propEq, reject, anyPass, isEmpty, isNil } from "ramda";

const Search = ({ authors, genres, books, onSearch }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: {} });

  const onSubmit = (data) => {
    data = reject(anyPass([isEmpty, isNil]))(data);
    onSearch(data);
    /*reset({
        title: null,
        authorId: null,
        genre: null
    });*/
  };

  return (
    <div>
      <form className="searchForm" onSubmit={handleSubmit(onSubmit)}>
        <label>TITLE:</label>
        <input className="search-field" type="text" {...register("title")} />

        <label>AUTHOR:</label>
        <select className="search-field" {...register("authorId")}>
          <option value=""></option>
          {authors.map((author) => (
            <option
              value={prop("_id", author)}
              selected={propEq("authorId", prop("_id", author), books)}
            >
              {prop("firstName", author)} {prop("lastName", author)}
            </option>
          ))}
        </select>

        <label>GENRE:</label>
        <select className="search-field" {...register("genre")}>
          <option value=""></option>
          {genres.map((genre) => (
            <option value={genre} selected={propEq("genre", genre, books)}>
              {genre}
            </option>
          ))}
        </select>

        <button className="search-button">SEARCH</button>
      </form>
    </div>
  );
};

export default Search;
