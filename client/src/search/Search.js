import "antd/dist/antd.css";

const Search = () => {
  return (
    <div>
      <form className="searchForm">
        <div>TITLE</div>

        <input type="text" placeholder="title" />

        <label>AUTHOR:</label>
        <select id="authors" name="authors">
          <option value=""></option>
          <option value="balzac">Balzac</option>
          <option value="zola">Zola</option>
          <option value="sade">Sade</option>
          <option value="new-author">NEW AUTHOR</option>
        </select>

        <label>GENRE:</label>
        <select id="genre" name="genre">
          <option value=""></option>
          <option value="polar">POLAR</option>
          <option value="histoire">HISTOIRE</option>
          <option value="animaux">ANIMAUX</option>
          <option value="informatique">INFORMATIQUE</option>
          <option value="religion">RELIGION</option>
        </select>

        <div className="btn">
          <button>SEARCH</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
