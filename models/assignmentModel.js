const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  deadline: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdByName: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("assignments", assignmentSchema);
