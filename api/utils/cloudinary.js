require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { API_KEY, API_SECRET } = process.env;
cloudinary.config({
  cloud_name: "dy4bwfzua",
  api_key: API_KEY,
  api_secret: API_SECRET,
});

module.exports = cloudinary;
