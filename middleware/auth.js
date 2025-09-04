// middleware/auth.js
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.redirect("/login");
}

// use like: requireRole("teacher") or requireRole("teacher","admin")
function requireRole(...roles) {
  return function (req, res, next) {
    if (!req.session || !req.session.role) {
      return res.status(401).send("Not authenticated");
    }
    if (!roles.includes(req.session.role)) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}

module.exports = { isAuthenticated, requireRole };
