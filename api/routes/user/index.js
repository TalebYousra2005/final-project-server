const express = require("express");

const UserController = require("../../controllers/user.controller");
const router = express.Router();

module.exports = () => {
  router.get("/users", UserController.getAllUsers);
  router.get("/users/:id", UserController.getOneUserById);
  router.put("/users/:id", UserController.updateOneUser);
  router.delete("/users/:id", UserController.deleteOneUser);

  return router;
};
