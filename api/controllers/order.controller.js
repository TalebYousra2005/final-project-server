const Order = require("../models/order.model");
const Book = require("../models/book.model");
exports.addOneOrder = async (req, res) => {
  try {
    const { productId, clientId, sellerId } = req.body;
    const order = new Order({
      productId,
      clientId,
      sellerId,
    });
    const savedOrder = await order.save();
    res
      .status(201)
      .send({ message: "order placed successfully", data: savedOrder });
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong with adding an order");
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong with getting orders");
  }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ sellerId: req.user.user_id });
    console.log(userOrders)
    if (!userOrders) {
      return res.status(404).send({ message: "no orders" });
    }
    res
      .status(200)
      .send({ message: "orders retreived successfuly", data: userOrders });
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong while gitting user orders");
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).send("order deleted");
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong with deleting an order");
  }
};
