import "./App.css";
import React, {useEffect, useState} from 'react';
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "./query/BookQuery";
import Books from "./entity/Books";
import 'antd/dist/antd.css';

const App = () => {

  const {data,loading,error}=useQuery(GET_ALL_BOOKS);

  //useQuery for all genres & useQuery for all authors
  const [books,setBooks]=useState([]);

  const [title,setTitle]=useState('');


  useEffect(()=>{
    if(!loading){
      setBooks(data.getBooks)
    }
  },[data])

 
  
  return (
    <div className="App">
      <h1>Biblioteka</h1>
      <form className="searchForm">
        <div>TITLE</div>

        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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
      <div className="book">
        <Books books={books}/>
      </div>
    </div>
  );
};

export default App;
