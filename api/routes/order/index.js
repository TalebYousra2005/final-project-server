const express = require("express");
const router = express.Router();
const ordersController = require("../../controllers/order.controller.js");
const checkLogin = require("../../middleware/auth");

module.exports = () => {
  router.get("/orders", checkLogin, ordersController.getOrders);
  router.post("/orders/create", checkLogin, ordersController.addOneOrder);
  router.get("/orders/user", checkLogin, ordersController.getSellerOrders);
  router.delete("/orders/delete/:id", checkLogin, ordersController.deleteOrder);
  return router;
};
