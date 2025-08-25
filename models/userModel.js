const mongoose = require("mongoose");

const Loginschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true
  }
});

const User = mongoose.model("users", Loginschema);
module.exports = User;
