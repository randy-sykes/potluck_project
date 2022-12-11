const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("./auth");

// Route to login user
router.post("/login", userController.loginUser);

// Account route to create an account
router.post("/register", userController.createUser);

// Specific user account routes
router.get("/:username", auth, userController.getUser);

router.put("/:username", auth, userController.updateUser);

router.delete("/:username", auth, userController.deleteUser);

module.exports = router;
