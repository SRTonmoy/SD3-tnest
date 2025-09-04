const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// ---------------------- SIGNUP ----------------------
exports.signup = async (req, res) => {
  try {
    const data = {
      name: req.body.username,
      email: req.body.email.toLowerCase(), // normalize email
      password: req.body.password,
      role: req.body.role,
    };

    // check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.render("signup", { error: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // create user
    await User.create(data);

    // redirect to login
    res.redirect("/login");
  } catch (err) {
    console.error("Signup Error:", err);
    res.render("signup", { error: "Something went wrong. Try again." });
  }
};

// ---------------------- LOGIN ----------------------
exports.login = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // ✅ save session info
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.username = user.name;

    // ✅ redirect/render based on role
    if (user.role === "teacher") {
      return res.render("teacher", { username: user.name });
    } else if (user.role === "admin") {
      const totalUsers = await User.countDocuments();
      const totalTeachers = await User.countDocuments({ role: "teacher" });
      const totalStudents = await User.countDocuments({ role: "student" });

      const stats = { totalUsers, totalTeachers, totalStudents };
      return res.render("admin", { username: user.name, stats });
    } else if (user.role === "student") {
      return res.render("home", { username: user.name || user.email });
    } else {
      return res.redirect("/"); // fallback
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.render("login", { error: "Something went wrong. Try again." });
  }
};

// ---------------------- LOGOUT ----------------------
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.redirect("/");
    }
    res.clearCookie("connect.sid"); // clear session cookie
    res.redirect("/login");
  });
};
