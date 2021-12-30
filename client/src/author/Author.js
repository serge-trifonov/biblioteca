

const Author = ({author,index}) => {

  console.log(author)

  return (
    <div>
      
      <div className="author">
        <strong>{index}. {author.firstName} {author.lastName}</strong>{}
      </div>
    </div>
  );
};

export default Author;