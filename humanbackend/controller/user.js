const { sign } = require("jsonwebtoken");
const User = require("../models/user");
const { createToken } = require("../utils/tokenManager");
const { hash, compare } = require("bcryptjs");
const { cookie } = require("express-validator");
const path = require("path");

const handleUserSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // create a new token
    const token = createToken(user ,  "7d");
    return res
      .status(201)
      .json({ message: "OK" ,token: token, user : user});
  } catch (err) {
    return res.status(500).json({ error: "error", cause: err.message });
  }
};

const handleUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User Not Register");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }
    const token = createToken(user ,"7d");

    return res.status(200).json({
      message: "OK",
      token: token,
      user: user,
    });
  } catch (err) {
    return res.status(200).json({ message: "error", cause: err.message });
  }
};
const handleLogout = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(process.env.COOKIE_NAME, {
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleLogout,
};
