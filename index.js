// Import the Express framework to create the server
const express = require("express");

// Import the path module (built-in Node.js) for handling file paths (optional here)
const path = require("path");

// Create an instance of an Express app
const app = express();

// Import Mongoose to connect to MongoDB
const mongoose = require('mongoose');

// Import routes that handle authentication (signup & login)
const authRoutes = require("./routes/authRoutes");


// -------------------- CONNECT TO MONGODB --------------------
// Connect to local MongoDB database named 'ProjectSD3'
mongoose.connect("mongodb://localhost:27017/ProjectSD3")
    .then(() => console.log("DB Connected"))            // If successful, log success
    .catch(() => console.log("DB Connection Failed"));   // If failed, log error


// -------------------- MIDDLEWARES --------------------

// Parses incoming requests with JSON payloads (useful for APIs)
app.use(express.json());

// Parses form data (application/x-www-form-urlencoded), like from HTML forms
app.use(express.urlencoded({ extended: false }));

// Serve static files (e.g., CSS, JS, images) from the 'public' folder
app.use(express.static("public"));

// Set EJS as the view engine so we can render .ejs files from the 'views' folder
app.set("view engine", "ejs");


// -------------------- ROUTES --------------------

// Use the authRoutes file for all routes starting from "/"
// It contains routes like "/", "/signup", "/login"
app.use("/", authRoutes);


// -------------------- START SERVER --------------------

// Define the port number for the server to listen on
const port = 5000;

// Start the Express server and log the running status
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
