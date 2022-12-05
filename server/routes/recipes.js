const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const commentsController = require("../controllers/commentsController");

// Recipe routes
/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get a list(array) of all Recipes in the database.
 *     description: Retrieve an array of Recipe Objects.
 *     responses:
 *       200:
 *         description: A list (array) of Recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the recipe.
 *                         example: 637e9aa72d0e33937b60b85a
 *                       recipe_name:
 *                         type: string
 *                         description: Name of the recipe
 *                         example: "Best Recipe"
 *                       description:
 *                         type: string
 *                         description: Description of the recipe
 *                         example: "Good Food"
 *                       directions:
 *                         type: string
 *                         description: This is the instructions for how to create the specific recipe
 *                         example: "Cook it"
 *                       servings:
 *                         type: number
 *                         description: Number value for number of servings
 *                         example: 8
 *                       prep_time:
 *                         type: number
 *                         description: Number value for how long it takes to prep in minutes
 *                         example: 5
 *                       cook_time:
 *                         type: number
 *                         description: Number value for how long it takes to cook in minutes
 *                         example: 20
 *                       author:
 *                         type: string
 *                         description: Object ID for the user that saved/created the recipe
 *                         example: 638cf0342ff1e8964f2952e4
 *                       ingredients:
 *                         type: array
 *                         description: 'Array of Ingredient objects'
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredient_name:
 *                               type: string
 *                               description: Name of the ingredient
 *                               example: Olive Oil
 *                             measurement:
 *                               type: string
 *                               description: Measurement of the ingredient
 *                               example: tablespoon
 *                             amount:
 *                               type: string
 *                               description: Amount of the ingredient's measurement
 *                               example: 1
 */
router.get("/", recipesController.getAllRecipes);

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new Recipe when you provide the correct data.
 *     description: Create a new Recipe using required data.
 *     requestBody:
 *       name: recipe
 *       required: true
 *       description: JSON with single key (recipe) that contains a recipe object.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe:
 *                 type: object
 *                 properties:
 *                   recipe_name:
 *                     type: string
 *                     description: Name of the recipe
 *                     example: "Best Recipe"
 *                   description:
 *                     type: string
 *                     description: Description of the recipe
 *                     example: "Good Food"
 *                   directions:
 *                     type: string
 *                     description: This is the instructions for how to create the specific recipe
 *                     example: "Cook it"
 *                   servings:
 *                     type: number
 *                     description: Number value for number of servings
 *                     example: 8
 *                   prep_time:
 *                     type: number
 *                     description: Number value for how long it takes to prep in minutes
 *                     example: 5
 *                   cook_time:
 *                     type: number
 *                     description: Number value for how long it takes to cook in minutes
 *                     example: 20
 *                   author:
 *                     type: string
 *                     description: Object ID for the user that saved/created the recipe
 *                     example: 638cf0342ff1e8964f2952e4
 *                   ingredients:
 *                     type: array
 *                     description: 'Array of Ingredient objects'
 *                     items:
 *                       type: object
 *                       properties:
 *                         ingredient_name:
 *                           type: string
 *                           description: Name of the ingredient
 *                           example: Olive Oil
 *                         measurement:
 *                           type: string
 *                           description: Measurement of the ingredient
 *                           example: tablespoon
 *                         amount:
 *                           type: string
 *                           description: Amount of the ingredient's measurement
 *                           example: 1
 *     responses:
 *       200:
 *         description: A list (array) of Recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the recipe.
 *                       example: 637e9aa72d0e33937b60b85a
 *                     recipe_name:
 *                       type: string
 *                       description: Name of the recipe
 *                       example: "Best Recipe"
 *                     description:
 *                       type: string
 *                       description: Description of the recipe
 *                       example: "Good Food"
 *                     directions:
 *                       type: string
 *                       description: This is the instructions for how to create the specific recipe
 *                       example: "Cook it"
 *                     servings:
 *                       type: number
 *                       description: Number value for number of servings
 *                       example: 8
 *                     prep_time:
 *                       type: number
 *                       description: Number value for how long it takes to prep in minutes
 *                       example: 5
 *                     cook_time:
 *                       type: number
 *                       description: Number value for how long it takes to cook in minutes
 *                       example: 20
 *                     author:
 *                       type: string
 *                       description: Object ID for the user that saved/created the recipe
 *                       example: 638cf0342ff1e8964f2952e4
 *                     ingredients:
 *                       type: array
 *                       description: 'Array of Ingredient objects'
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredient_name:
 *                             type: string
 *                             description: Name of the ingredient
 *                             example: Olive Oil
 *                           measurement:
 *                             type: string
 *                             description: Measurement of the ingredient
 *                             example: tablespoon
 *                           amount:
 *                             type: string
 *                             description: Amount of the ingredient's measurement
 *                             example: 1
 *                     source:
 *                       type: string
 *                       description: Source of the data, always "potluck"
 *                       example: potluck
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: Christmas
 *                     created_date:
 *                       type: string
 *                       example: 2022-12-05T02:11:23.368Z
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                             comment_text:
 *                               type: string
 *                             posted_date:
 *                               type: string
 *                             comment_by:
 *                               type: string
 *                               description: User ID Object
 *       403:
 *         description: Failure due to name existing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message "Recipe already exists with that name."
 *                   example: Recipe already exists with that name.
 *       406:
 *         description: Failure due to schema mismatch.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Error name "ValidationError"
 *                   example: ValidationError
 *                 message:
 *                   type: string
 *                   description: Message that explains what is missing.
 *                   example: "recipes validation failed: description: Recipe description required."
 *
 *
 */
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
