const Announcement = require("../models/announcementModel");
const User = require("../models/userModel");

// POST /announcements
exports.createAnnouncement = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("name");
    const ann = await Announcement.create({
      text: req.body.text,
      createdBy: req.session.userId,
      createdByName: user ? user.name : "Unknown"
    });
    res.json(ann);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create announcement" });
  }
};

// GET /announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const anns = await Announcement.find().sort({ createdAt: -1 });
    res.json(anns);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
};
