import mongoose from "mongoose";
import { genres } from "../constants.js";

const book = {
  authorId: { type: mongoose.Schema.Types.ObjectId },
  title: String,
  description: String,
  genre: {
    type: String,
    enum: genres
  },
  year: String
};

export default book;
