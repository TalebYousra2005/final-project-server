const mongoose = require("mongoose");

/**
 * * Order model consists of
 * *owner
 * *item
 * *createdAt
 * *
 */

const orderSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  clientId: {
    type: String,
  },
  sellerId: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
