// Import the mongoose library to work with MongoDB using schemas and models
const mongoose = require("mongoose");

// Define a schema (blueprint) for the user collection using mongoose.Schema
const Loginschema = new mongoose.Schema({
  // Define 'name' field: must be a string and is required (cannot be empty)
  role: {
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    required: true,
  },
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true }, // ✅ added email

  // Define 'password' field: must be a string and is required
  password: { type: String, required: true },
  role: { 
        type: String,
        enum: ['student', 'teacher', 'admin'],  // Limit possible values
        required: true
    }
});

// Create a model named 'users' using the schema above
// This will connect to the 'users' collection in your MongoDB
const User = mongoose.model("users", Loginschema);

// Export the model so it can be used in other files (like signup/login logic)
module.exports = User;
