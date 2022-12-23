const express = require("express");
const router = express.Router();
const BooksController = require("../../controllers/book.controller");
const checkLogin = require("../../middleware/auth");
const upload = require("../../middleware/upload");
module.exports = () => {
  router.post(
    "/books/create",
    checkLogin,
    upload.single("image"),
    BooksController.addOneBook
  );
  router.get("/books/:id", BooksController.getOneBookById);
  router.get("/books", BooksController.getBooks);
  router.put("/books/edit/:id", checkLogin, BooksController.updateOneBook);
  router.delete("/books/delete/:id", checkLogin, BooksController.deleteOneBook);
  router.get("/books/user/:id", checkLogin, BooksController.getBooksOfUser);
  return router;
};
