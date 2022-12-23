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
const documentSchema = new mongoose.Schema({
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
  file: {
    type: String,
  },
  subject: {
    type: String,
  },
  type: {
    type: String,
    default: "document",
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

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
