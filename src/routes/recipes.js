const express = require("express");
const router = express.Router();

// Recipe routes
router.get("/", (req, res) => {
  const data = fakeData;
  res.render("allRecipes.ejs", { data });
});

router.post("/", (req, res) => {
  res.send("CREATE Recipe route");
});

// Specific recipe routes
router.get("/:recipe_id", (req, res) => {
  res.send("GET Specific Recipe route");
});

router.put("/:recipe_id", (req, res) => {
  res.send("UPDATE Specific Recipe route");
});

router.delete("/:recipe_id", (req, res) => {
  res.send("DELETE Specific Recipe route");
});

// Comment routes for specific recipes
router.post("/:recipe_id/comments", (req, res) => {
  res.send("CREATE comment for specific recipe route");
});

router.put("/:recipe_id/comments", (req, res) => {
  res.send("UPDATE comment for specific recipe route");
});

router.delete("/:recipe_id/comments", (req, res) => {
  res.send("DELETE comment for specific recipe route");
});

module.exports = router;
