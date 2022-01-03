import { prop,path } from "ramda";
import { GET_AUTHOR } from "../query/FindAuthorQuery";
import { useQuery } from "@apollo/client";


const BookInfo = ({book}) => {

  const {data, loading, refetch } = useQuery(GET_AUTHOR, {
    variables: {
      _id: prop("authorId", book)}
  });

  const name=path(["getAuthor","firstName"],data)+" "+path(["getAuthor","lastName"],data)

  return (
    <div className="bookInfo">
      <div className="title-book-author">"{book.title}"</div>
      <div><strong>AUTHOR:</strong> {name} </div>
      <div><strong>GENRE:</strong> {book.genre} </div>
      <div><strong>DESCRIPTION:</strong> {book.description} </div>
      <div><strong>YEAR:</strong> {book.year} </div>
      
    </div>
  );
};

export default BookInfo;
