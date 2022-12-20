const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const auth = require("../middleware/auth");

// Recipe routes
router.get("/", recipesController.getAllRecipes);

router.post("/", auth, recipesController.createNewRecipe);

// Specific recipe routes
router.get("/:recipe_id", recipesController.getSpecificRecipe);

router.put("/:recipe_id", auth, recipesController.updateSpecificRecipe);

router.delete("/:recipe_id", auth, recipesController.deleteSpecificRecipe);

module.exports = router;
