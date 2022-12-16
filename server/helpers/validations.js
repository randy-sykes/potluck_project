const jwt = require("jsonwebtoken");

function jwtValidation(token) {
  return jwt.verify(token, process.env.TOKEN_KEY);
}

module.exports = {
  jwtValidation,
};
