const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to login user
router.post("/login", userController.loginUser);

// Account route to create an account
router.post("/register", userController.createUser);

// Specific user account routes
router.get("/:username", userController.getUser);

router.put("/:username", userController.updateUser);

router.delete("/:username", userController.deleteUser);

module.exports = router;
