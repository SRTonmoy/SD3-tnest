// routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { isAuthenticated, requireRole } = require("../middleware/auth");
const uploadController = require("../controllers/uploadController");

// ensure uploads dir exists
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // must exist
  },
  filename: function (req, file, cb) {
    const safeBase = path.basename(file.originalname, path.extname(file.originalname)).replace(/[^\w\-]+/g, "_");
    cb(null, `${Date.now()}_${safeBase}${path.extname(file.originalname)}`);
  }
});

// allow common docs/images; adjust as you like
const allowed = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/png",
  "image/jpeg",
  "application/zip"
];

function fileFilter(req, file, cb) {
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Unsupported file type"), false);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

// ROUTES
// teacher/admin can upload
router.post("/uploads", isAuthenticated, requireRole("teacher", "admin"), upload.single("file"), uploadController.uploadFile);

// all logged-in users can list files
router.get("/uploads/files", isAuthenticated, uploadController.getFiles);

// optional download route
router.get("/uploads/download/:id", isAuthenticated, uploadController.downloadFile);

module.exports = router;
