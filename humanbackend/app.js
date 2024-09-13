const express = require('express');
const { connectToMongoDB } = require('./connect');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();


// Import Routes

const authRoutes = require("./routes/auth");
// const healthRoutes = require('./routes/health');
// const educationRoutes = require('./routes/education');
// const mentalHealthRoutes = require('./routes/mentalHealth');

// Initialize Express
const app = express();

// Middleware


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieParser());


// Connect to MongoDB

// Route Middleware
app.get('/',(req, res)=>{
    res.send("Welcome to the World of growth")
})

app.use("/api/auth", authRoutes);
// app.use('/api/health', healthRoutes);
// app.use('/api/education', educationRoutes);
// app.use('/api/mentalHealth', mentalHealthRoutes);

// Start Server


const PORT = process.env.PORT || 2000;

connectToMongoDB("mongodb://127.0.0.1:27017/human")
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err)=>{
    console.error(err);

})

