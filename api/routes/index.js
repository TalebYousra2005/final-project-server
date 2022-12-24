const express = require("express");
const authRoutes = require("./auth");
const bookRouter = require("./book");
const orderRouter = require("./order/index");
const userRouter = require("./user/index");
const documentRouter = require("./document/index");
const router = express.Router();

module.exports = () => {
  router.use("/", authRoutes(), bookRouter(), orderRouter(), userRouter());
  return router;
};
