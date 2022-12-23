const mongoose = require("mongoose");
/**
 * * the book must have
 * *title
 * *author
 * *price
 * *subject
 * *type:book
 * *image
 * *cloudinary_id
 * *createdAt
 */
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  subject: {
    type: String,
  },
  type: {
    type: String,
    default: "book",
  },
  ownerId: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
