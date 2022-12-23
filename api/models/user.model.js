const mongoose = require("mongoose");

/* *
 * *User model consists of :
 * *first and last Name
 * *userName
 * *email
 * *password
 * *studyFeild
 * *orders
 * *token
 * *createdAt
 */
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
  },
  studyFeild: {
    type: String,
    required: true,
  },
  orders: {
    type: [Object],
    default: [],
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
