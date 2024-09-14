const express = require("express");
const { handleUserSignup, handleUserLogin, handleLogout } = require("../controller/user");
const { verifyToken } = require("../utils/tokenManager");
const router = express.Router();

// Create a new user
router.post("/signup", handleUserSignup);
router.post("/login",  handleUserLogin);
router.post("/logout", verifyToken, handleLogout);


module.exports = router;
