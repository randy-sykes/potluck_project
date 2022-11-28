const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const commentsController = require("../controllers/commentsController");

// Recipe routes
router.get("/", recipesController.getAllRecipes);

router.post("/", recipesController.createNewRecipe);

// Specific recipe routes
router.get("/:recipe_id", recipesController.getSpecificRecipe);

router.put("/:recipe_id", recipesController.updateSpecificRecipe);

router.delete("/:recipe_id", recipesController.deleteSpecificRecipe);

// Comment routes for specific recipes
router.post("/:recipe_id/comments", commentsController.createComment);

router.put("/:recipe_id/comments", commentsController.updateComment);

router.delete("/:recipe_id/comments", commentsController.deleteComment);

module.exports = router;
