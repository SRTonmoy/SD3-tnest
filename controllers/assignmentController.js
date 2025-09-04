const Assignment = require("../models/assignmentModel");
const User = require("../models/userModel");

// POST /assignments
exports.createAssignment = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("name");
    const assignment = await Assignment.create({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      createdBy: req.session.userId,
      createdByName: user ? user.name : "Unknown"
    });
    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create assignment" });
  }
};

// GET /assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};
