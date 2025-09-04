// controllers/uploadController.js
const path = require("path");
const fs = require("fs");
const Upload = require("../models/uploadModel");
const User = require("../models/userModel");

// POST /uploads  (teacher/admin only)
async function uploadFile(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    // find user name for caching
    const user = await User.findById(req.session.userId).select("name");
    const doc = await Upload.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      url: `/uploads/${req.file.filename}`,
      uploadedBy: req.session.userId,
      uploadedByName: user ? user.name : "Unknown",
      role: req.session.role
    });

    return res.json({
      message: "Uploaded",
      file: {
        id: doc._id,
        originalName: doc.originalName,
        url: doc.url,
        uploadedByName: doc.uploadedByName,
        uploadedAt: doc.uploadedAt
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Upload failed" });
  }
}

// GET /uploads/files (any logged-in user)
async function getFiles(req, res) {
  try {
    const files = await Upload.find({}).sort({ uploadedAt: -1 }).lean();
    // only return what UI needs
    const clean = files.map(f => ({
      id: f._id,
      originalName: f.originalName,
      url: f.url,
      uploadedByName: f.uploadedByName,
      uploadedAt: f.uploadedAt
    }));
    res.json(clean);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load files" });
  }
}

// (Optional) GET /uploads/download/:id → force download
async function downloadFile(req, res) {
  try {
    const file = await Upload.findById(req.params.id);
    if (!file) return res.status(404).send("Not found");
    return res.download(path.resolve(file.path), file.originalName);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
}

module.exports = { uploadFile, getFiles, downloadFile };
