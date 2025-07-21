// Import the Express framework to create the web server
const express = require("express");

// Import Node.js path module for handling and transforming file paths
const path = require("path");

// Import the MongoDB collection instance from config.js (assumed to export a collection)
const collection = require("./config");

// Import bcrypt library to hash and verify passwords securely
const bcrypt = require('bcrypt');

// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON requests and convert them into JavaScript objects
app.use(express.json());

// Serve static files (like CSS, JS, images) from the 'public' folder
app.use(express.static("public"));

// Middleware to parse URL-encoded bodies (form submissions), extended false means simple query string parsing
app.use(express.urlencoded({ extended: false }));

// Set the template engine for rendering dynamic HTML pages to EJS
app.set("view engine", "ejs");

// Route handler for HTTP GET requests to the root URL "/"
// Renders the 'login' page (login.ejs) when someone visits the home page
app.get("/", (req, res) => {
    res.render("login");
});

// Route handler for HTTP GET requests to "/signup"
// Renders the 'signup' page (signup.ejs) where users can register
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Route handler for HTTP POST requests to "/signup"
// Handles the form submission when a user tries to register
app.post("/signup", async (req, res) => {

    // Create a data object with the username and password sent in the request body
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // Check if a user with the same username already exists in the database collection
    const existingUser = await collection.findOne({ name: data.name });

    // If the user exists, send a response saying username is taken
    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Define how many salt rounds to use for bcrypt hashing to increase security
        const saltRounds = 10;

        // Hash the user's password securely using bcrypt with the specified salt rounds
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        // Replace the plain text password in the data object with the hashed password
        data.password = hashedPassword;

        // Insert the new user data (username + hashed password) into the database collection
        const userdata = await collection.insertMany(data);

        // Log the inserted user data to the server console for debugging
        console.log(userdata);

        // Optionally you should send a success response here (missing)
        res.send("User registered successfully.");
    }
});

// Route handler for HTTP POST requests to "/login"
// Handles user login form submission and authentication
app.post("/login", async (req, res) => {
    try {
        // Find the user in the database by username
        const check = await collection.findOne({ name: req.body.username });

        // If user is not found, send an error response
        if (!check) {
            res.send("User name cannot found");
            return; // Important to stop execution here
        }

        // Compare the submitted plain password with the hashed password stored in the database
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

        // If passwords do not match, send an error response
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            // If passwords match, render the 'home' page (home.ejs) indicating successful login
            res.render("home");
        }
    }
    catch {
        // If any error occurs (e.g., DB issues), send a generic error response
        res.send("wrong Details");
    }
});

// Define the port number where the server will listen for requests
const port = 5000;

// Start the server and listen on the specified port, log message on success
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
