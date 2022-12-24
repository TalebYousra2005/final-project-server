const express = require("express");
const router = express.Router();
const emailController = require(`../../controllers/email.sender`);
const checkLogin = require("../../middleware/auth");

module.exports = () => {
  router.post("/email/send", checkLogin, emailController.sendEmail);
  return router;
};
