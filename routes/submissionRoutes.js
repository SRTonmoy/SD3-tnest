const express = require("express");
const router = express.Router();
const Submission = require("../models/submissionModels");

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // store in /uploads

// Submit an assignment
router.post("/:assignmentId", upload.single("file"), async (req, res) => {
  try {
    const submission = new Submission({
      assignmentId: req.params.assignmentId,
      studentId: req.user ? req.user._id : null, // optional
      fileUrl: req.file.path,
      submittedAt: new Date(),
    });

    await submission.save();
    res.json({ success: true, message: "Submission successful" });
  } catch (err) {
    console.error("❌ Submission error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("assignmentId", "title")
      .populate("studentId", "name email")
      .sort({ submittedAt: -1 });

    const data = submissions.map(s => ({
      studentName: s.studentId ? s.studentId.name : "Unknown Student",
      studentEmail: s.studentId ? s.studentId.email : "N/A",
      assignmentTitle: s.assignmentId ? s.assignmentId.title : "Unknown Assignment",
      fileUrl: "/" + s.fileUrl.replace(/\\/g, "/"),
      submittedAt: s.submittedAt
    }));

    res.json(data); // ✅ only once
  } catch (err) {
    console.error("❌ Failed to fetch submissions:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
