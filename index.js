// index.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

// -------------------- CONNECT TO MONGODB --------------------
mongoose.connect("mongodb://localhost:27017/ProjectSD3")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Failed", err));

// -------------------- MIDDLEWARES --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sessions (DEV-only MemoryStore; fine for local dev)
app.use(session({
  secret: "dev-secret-please-change", // change in real use
  resave: false,
  saveUninitialized: false,
}));

// Static files
app.use(express.static("public"));
// Serve uploaded files statically (so /uploads/<filename> works)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// View engine
app.set("view engine", "ejs");

// -------------------- ROUTES --------------------
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

// NEW: upload routes
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/", uploadRoutes);

// -------------------- START SERVER --------------------
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// After your other routes
const assignmentRoutes = require("./routes/assignmentRoutes");
app.use("/", assignmentRoutes);
const announcementRoutes = require("./routes/announcementRoutes");
app.use("/", announcementRoutes);
const submissionRoutes = require("./routes/submissionRoutes");
app.use("/submissions", submissionRoutes);
