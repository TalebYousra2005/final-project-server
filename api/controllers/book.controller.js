const Book = require("../models/book.model");
const cloudinary = require("../utils/cloudinary");


exports.getOneBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("book not found");
    }
    res
      .status(200)
      .send({ message: "book retreived with success", data: book });
  } catch (err) {
    res.status(err.status || 500).send(err.message || "something went wrong");
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res
      .status(200)
      .send({ message: "books retreived successfully", data: books });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addOneBook = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host"); // => "http://localhost:4000"
    // ! the link for the post image is "http://localhost:4000/uploads/name"
    const { title, author, pages, price, ownerId } = req.body;
    // console.log(ownerId);
    // console.log(req.body);
    // saving image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const book = new Book({
      title,
      author,
      pages,
      price,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      ownerId: ownerId,
    });
    // saving our new created instances
    const savedBook = await book.save();
    res
      .status(201)
      .send({ message: "book created with success", data: savedBook });
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong while adding a book");
  }
};

exports.updateOneBook = async (req, res) => {
  try {
    if (req.file) {
      const { title, author, pages, price } = req.body;
      let b = await Book.findOne({ _id: req.params.id });
      await cloudinary.uploader.destroy(b.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const url = req.protocol + "://" + req.get("host");
      const book = await Book.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title,
          author: author,
          pages: pages,
          price: price,
          image: result.secure_url,
          cloudinary_id: result.public_id,
        },
        { new: true, useFindAndModify: false }
      );
      res
        .status(200)
        .send({ message: "book updated with success", data: book });
    } else {
      const { title, author, pages, price } = req.body;
      let book = await Book.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          title,
          author,
          pages,
          price,
        },
        { new: true, useFindAndModify: false }
      );
      res.status(200).json({ message: "book updted with success", data: book });
    }
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong while updating a book");
  }
};

exports.deleteOneBook = async (req, res) => {
  try {
    // console.log(req.params.id);
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send("book not found");
    }

    await cloudinary.uploader.destroy(book.cloudinary_id);
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send("Book deleted");
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong while updating book");
  }
};

exports.getBooksOfUser = async (req, res) => {
  try {
    const books = await Book.find({ ownerId: req.params.id });
    if (!books) {
      return res.status(404).send({ message: "You have no books" });
    }
    res
      .status(200)
      .send({ message: "books retreived successfully", data: books });
  } catch (err) {
    res.status(err.message || 500).send(err.message || "message");
  }
};
