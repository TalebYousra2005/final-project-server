const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      contact,
      studyFeild,
    } = req.body;

    // *server form validation
    if (
      !(
        firstName &&
        lastName &&
        userName &&
        email &&
        password &&
        contact &&
        studyFeild
      )
    ) {
      return res.status(400).send("all inputs are required");
    }
    //* checking if the user exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res
        .status(409)
        .send({ message: "User already exists, please login" });
    }

    //*hashing password
    const hashedPassword = await bcrypt.hash(password, 15);

    // *creating user
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      contact,
      studyFeild,
    });
    res.status(201).send({
      message: "successfully signed up, now please signin",
      data: newUser,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong while registration");
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //*server form validation
    if (!(email && password)) {
      return res.status(400).send({ message: "All inputs are required" });
    }

    //* search for user in db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found, please signup" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      // *if our user exists and the password is correct we create the token
      const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY);
      // user.token = token;
      res
        .status(200)
        .send({ message: "signed in in successfully", data: user, token });
    } else {
      return res.status(409).send({ message: "incorerct email or password" });
    }
  } catch (err) {
    res
      .status(500)
      .send({
        message: err.message || "something went wrong while signing in ",
      });
  }
};

exports.getAccount = async (req, res) => {
  if (req.user) {
    await res.json({ user: req.user });
  } else {
    await res.json({ user: null });
  }
};
