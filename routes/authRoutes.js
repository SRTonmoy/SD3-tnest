// Import the Express framework
const express = require('express');

// Create a router object to define route handlers
const router = express.Router();

// Import the signup/login controller functions from the controller file
const authController = require('../controllers/authController');


// -------------------- VIEW ROUTES --------------------

// When the user visits the root URL ("/"), render the "login" view
// This is typically a login form (login.ejs or login.pug file)
router.get("/", (req, res) => res.render("login"));

// When the user visits "/signup", render the "signup" view
// This will show the signup form
router.get("/signup", (req, res) => res.render("signup"));


// -------------------- LOGIC ROUTES --------------------

// When the signup form is submitted, handle it with authController.signup
// This route processes the signup form data and creates a user
router.post("/signup", authController.signup);

// When the login form is submitted, handle it with authController.login
// This route checks the credentials and logs the user in
router.post("/login", authController.login);


// Export the router so it can be imported in the main server file (like index.js or app.js)
module.exports = router;
