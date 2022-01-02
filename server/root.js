import mongoose from 'mongoose';
import author from './schemas/author.js';
import book from './schemas/book.js';
import R from 'ramda';
import { genres } from './constants.js';


const Author = mongoose.model('authors', author);
const Book = mongoose.model('books', book);

export const root = {
    getAllAuthors: async () => {
      const authors = await Author.find({}).lean(); 
      return authors;
    },
  
    getAuthor: async (id) => {
        const author = await Author.findById(id).lean();
        const books = await Book.find({authorId: id}).lean();
        return {...author, books};
    },
    addAuthor: async (data) => {
        await Author.create(R.prop("author", data));
        return {ok: true}
    },
    deleteAuthor: async (id) => {
      const objId = mongoose.Types.ObjectId(id);
      await Book.deleteMany({ authorId: objId });
      await Author.deleteOne({_id: objId});
      return {ok: true};
    },
    updateAuthor: async (data) => {
      await Author.updateOne({_id: R.prop("id", data)}, R.prop("author", data));
      return {ok: true}
    },
    updateBook: async (data) => {
      await Book.updateOne({_id: R.prop("id", data)}, R.prop("book", data));
      return {ok: true}
    },
    getBooks: async () => {
      const books = await Book.find({}).lean();
      return books;
    },
    getBook: async (id) => {
      const book = await Book.findById(id).lean();
      const author=await Author.findById(R.prop("authorId", book)).lean();
      
      const authorName=R.propOr("unknown", "firstName",author)+" "+R.propOr("unknown", "lastName",author);
      return R.assoc("authorName", authorName, book);
    },
    addBook: async (data) => {
      await Book.create(R.prop("book", data));
      return {ok: true}
    },
    deleteBook: async (id) => {
      const objId = mongoose.Types.ObjectId(id);
      await Book.deleteOne({_id: objId});
      return {ok: true};
    },
    findBooksByParams: async (params) => {
      const tempBook = await Book.find(R.prop("bookParams", params)).lean();
      return tempBook;
    },
    getGenres: () => {
      return {genres};
    }
  };