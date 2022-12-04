const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

// Login route
// loginController will handle all of the actual code for the login routes.
router.post("/", loginController.login);

module.exports = router;
