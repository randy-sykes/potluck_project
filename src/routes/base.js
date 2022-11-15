const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET Home route");
});

router.get("*", (req, res) => {
  res.status(404).send("Why are you here?");
});

module.exports = router;
