// Import bcrypt library for password hashing and comparison
const bcrypt = require('bcrypt');

// Import the User model from the userModel.js file (mongoose schema)
const User = require('../models/userModel');


// ---------------------- SIGNUP FUNCTION ----------------------
// Handle user signup
exports.signup = async (req, res) => {
    // Create a data object containing the username and password from the request body
    const data = {
        name: req.body.username,        // Taking 'username' input from frontend form

        email: req.body.email,            // ✅ get email from form

        password: req.body.password     // Taking 'password' input from frontend form
    }

    // Check if a user with the same name already exists in the database
    
    // const existingUser = await User.findOne({ name: data.name });
    const existingUser = await User.findOne({ email: data.email });
    
    // If a user already exists, return a message and stop further execution
    if (existingUser) {
        return res.send("User already exists"); // Prevent duplicate user registration
    }

    // Hash the user's password using bcrypt with a salt round of 10
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Replace the plain password with the hashed version before saving
    data.password = hashedPassword;

    // Create a new user in the database with the hashed password
    await User.create(data);

    // Send confirmation to the client after successful registration
    res.send("User registered successfully");
};


// ---------------------- LOGIN FUNCTION ----------------------
// Handle user login
exports.login = async (req, res) => {
    try {
        // Search the database for a user with the name matching the login input
        const user = await User.findOne({ email: req.body.email });

        // If no user is found, send an error message
        if (!user) return res.send("Username not found");

        // Compare the password entered with the hashed password stored in the database
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        // If the password doesn't match, send an error message
        if (!isMatch) return res.send("Wrong password");

        // If everything is correct, render the 'home' page (or redirect to a dashboard)
        res.render("home"); // Make sure you have a view named 'home.ejs' or 'home.pug' etc.
    } catch (err) {
        // Catch any error that occurs during login and send a generic error message
        res.send("Error occurred");
    }
};
