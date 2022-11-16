const express = require("express");
const router = express.Router();
const baseController = require("../controllers/baseController");

router.get("/", baseController.getRoot);

router.get("*", baseController.getWildcard);

module.exports = router;
