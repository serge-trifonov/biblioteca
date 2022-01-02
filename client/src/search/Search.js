import "antd/dist/antd.css";
import { useForm } from "react-hook-form";
import { prop, propEq, reject, anyPass, isEmpty, isNil } from "ramda";

const Search = ({authors,genres,books,onSearch}) => {

  const { register, handleSubmit, reset } = useForm({ defaultValues: {} });

  const onSubmit = (data) => {
    data = reject(anyPass([isEmpty, isNil]))(data); //pour supprimer les champs vides et nulles
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
        <div> TITLE:

        <input type="text"{...register("title")}/>
        </div>

        
        <label>AUTHOR:</label>
        <select
          style={{ width: 120 }}
          {...register("authorId")}
        >
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
        <select style={{ width: 120 }} {...register("genre")}>
          <option value=""></option>
          {genres.map((genre) => (
            <option value={genre} selected={propEq("genre", genre, books)}>
              {genre}
            </option>
          ))}
        </select>

        

        <div style={{margin:'0 5px'}}>
          <button>SEARCH</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
