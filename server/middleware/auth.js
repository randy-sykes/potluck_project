const jwt = require("jsonwebtoken");
const { jwtValidation } = require("../helpers/validations");

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwtValidation(token);
    req.user = verified;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ error: "InvalidToken", message: "Please provide a valid token" });
  }
}

module.exports = auth;
