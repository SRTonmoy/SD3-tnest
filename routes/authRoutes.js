// Import the Express framework
const express = require('express');

// Create a router object to define route handlers
const router = express.Router();

// Import the signup/login controller functions from the controller file
const authController = require('../controllers/authController');


// -------------------- VIEW ROUTES --------------------

// Landing page route — this shows BEFORE login/signup
router.get("/", (req, res) => res.render("welcome")); // <-- New landing page

// Login page route
router.get("/login", (req, res) => res.render("login"));

// Signup page route
router.get("/signup", (req, res) => res.render("signup"));


// -------------------- LOGIC ROUTES --------------------

// Signup form submission handler
router.post("/signup", authController.signup);

// Login form submission handler
router.post("/login", authController.login);


// Export the router so it can be imported in the main server file (like index.js or app.js)
module.exports = router;
