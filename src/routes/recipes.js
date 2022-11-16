const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");

// Recipe routes
router.get("/", recipesController.getAllRecipes);

router.post("/", recipesController.createNewRecipe);

// Specific recipe routes
router.get("/:recipe_id", recipesController.getSpecificRecipe);

router.put("/:recipe_id", recipesController.updateSpecificRecipe);

router.delete("/:recipe_id", recipesController.deleteSpecificRecipe);

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
