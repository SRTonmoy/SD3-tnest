// Import bcrypt library for password hashing and comparison
const bcrypt = require('bcrypt');

// Import the User model from the userModel.js file (mongoose schema)
const User = require('../models/userModel');


// ---------------------- SIGNUP FUNCTION ----------------------
// Handle user signup
exports.signup = async (req, res) => {
    // Create a data object containing the username, email, and password from the request body
    const data = {
        name: req.body.username,         // ✅ name (from input field)
        email: req.body.email,           // ✅ email (from input field)
        password: req.body.password,
    role: req.body.role
       
             // ✅ password (from input field)
    };

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: data.email });

    // If a user already exists, return a message and stop further execution
    if (existingUser) {
        return res.send("User already exists");
    }

    // Hash the user's password using bcrypt with a salt round of 10
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Replace the plain password with the hashed version before saving
    data.password = hashedPassword;

    // Create a new user in the database with hashed password
    await User.create(data);

    // ✅ After signup, redirect to login page
    res.redirect("/login");
};



// ---------------------- LOGIN FUNCTION ----------------------
// Handle user login
exports.login = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
const user = await User.findOne({ email });
    if (!user) {
      // Render login page again with error message
      return res.render("login", { error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password", email: email });

    }
        // ✅ Check user role and redirect accordingly
        if (user.role === 'teacher') {
            return res.render("teacher", { username: user.name });
        } else if (user.role === 'admin') {
             const totalUsers = await User.countDocuments();
            const totalTeachers = await User.countDocuments({ role: 'teacher' });
            const totalStudents = await User.countDocuments({ role: 'student' });

            const stats = {
                totalUsers,
                totalTeachers,
                totalStudents
            };
            return res.render("admin", { username: user.name,stats });
        } else {
            return res.render("home", {
            username: user.name || user.email   // <-- ✅ Pass data to home.ejs
        });
    }
    } catch (err) {
        res.send("Error occurred");
    }
};
