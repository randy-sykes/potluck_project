const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const commentsController = require("../controllers/commentsController");
const auth = require("./auth");

// Recipe routes
router.get("/", recipesController.getAllRecipes);

router.post("/", auth, recipesController.createNewRecipe);

// Specific recipe routes
router.get("/:recipe_id", recipesController.getSpecificRecipe);

router.put("/:recipe_id", auth, recipesController.updateSpecificRecipe);

router.delete("/:recipe_id", auth, recipesController.deleteSpecificRecipe);

// Comment routes for specific recipes
router.post("/:recipe_id/comments", auth, commentsController.createComment);

router.put("/:recipe_id/comments", auth, commentsController.updateComment);

router.delete("/:recipe_id/comments", auth, commentsController.deleteComment);

module.exports = router;
