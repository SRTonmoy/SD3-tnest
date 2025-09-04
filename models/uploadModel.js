// models/uploadModel.js
const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  originalName: { type: String, required: true },   // e.g. "Lecture-1.pdf"
  filename:     { type: String, required: true },   // saved name in /uploads
  path:         { type: String, required: true },   // "uploads/<filename>"
  url:          { type: String, required: true },   // "/uploads/<filename>" (static serve)
  uploadedBy:   { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  uploadedByName: { type: String, required: true }, // cached name for convenience
  role:         { type: String, enum: ["teacher","admin"], required: true },
  uploadedAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model("uploads", uploadSchema);
