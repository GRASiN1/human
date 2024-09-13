const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");


// Import Routes
// const authRoutes = require('./routes/auth');
// const healthRoutes = require('./routes/health');
// const educationRoutes = require('./routes/education');
// const mentalHealthRoutes = require('./routes/mentalHealth');
const { connectToMongoDB } = require('./connect');

// Initialize Express
const app = express();

// Middleware


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());


// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/human")


// Route Middleware
app.get('/',(req, res)=>{
    res.send("Welcome to the World of growth")

})
// app.use('/api/auth', authRoutes);
// app.use('/api/health', healthRoutes);
// app.use('/api/education', educationRoutes);
// app.use('/api/mentalHealth', mentalHealthRoutes);

// Start Server


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
