const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdByName: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("announcements", announcementSchema);
