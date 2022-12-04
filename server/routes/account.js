const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

// Account route to create an account
router.post("/", accountController.createUserAccount);

// Specific user account routes
router.get("/:username", accountController.getUserAccount);

router.put("/:username", accountController.updateUserAccount);

router.delete("/:username", accountController.deleteUserAccount);

module.exports = router;
