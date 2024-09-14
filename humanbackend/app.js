const cors = require('cors');
const express = require("express");
const { connectToMongoDB } = require("./connect");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// Import Routes

const authRoutes = require("./routes/auth");
const healthRoutes = require("./routes/health.js");

const educationRoutes = require("./routes/education.js");
const financeRoutes = require("./routes/finance.js");
const { createChatSession, submitQuery } = require("./utils/apicalls.js");
const { setsid, get } = require("./services/auth.js");
const { checkAuth } = require('./middlewares/auth.js');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieParser());

// Connect to MongoDB

// Route Middleware

app.get("/", async (req, res) => {
  
  res.json({ msg: "welcome"});
});

app.use("/api/auth", authRoutes);
app.use("/api/health", checkAuth,healthRoutes);
app.use("/api/education",checkAuth, educationRoutes);
app.use("/api/finance",checkAuth,financeRoutes);

// Start Server

const PORT = process.env.PORT || 2000;

connectToMongoDB("mongodb://localhost:27017/human")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
