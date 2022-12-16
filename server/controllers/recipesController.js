const dataController = require("./dataController");
const { jwtValidation } = require("../helpers/validations");

// Helper to validate recipe objects
const validRecipeObj = (recipe) => {
  const recipeKeys = [
    "recipe_name",
    "description",
    "directions",
    "servings",
    "prep_time",
    "cook_time",
  ];
  const ingredientKeys = ["amount", "ingredient_name"];
  const missingFields = recipeKeys.filter((key) => !recipe.hasOwnProperty(key));
  ingredientKeys.forEach((key) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredient.hasOwnProperty(key)) {
        missingFields.push(key);
      }
    });
  });
  return missingFields;
};

const getAllRecipes = async (req, res) => {
  const result = await dataController.getAllRecipesInDB();
  if (result?.error) {
    res.status(500).json({ error: result.message });
  } else {
    res.json(result);
  }
};

const createNewRecipe = async (req, res) => {
  // confirm there is a recipe
  if (req.body.recipe === undefined) {
    res.status(400).json({ error: "Please provide a recipe object." });
    return;
  }
  const recipe = req.body.recipe;
  // validate recipe
  const missingFields = validRecipeObj(recipe);
  if (missingFields.length > 0) {
    res
      .status(406)
      .json({ error: "MissingFields", missingFields: missingFields });
    return;
  }
  // validate user
  const userTokenInfo = jwtValidation(req.header("auth-token"));
  const validUser = await dataController.userExistsInDB(
    "_id",
    userTokenInfo._id
  );
  if (!validUser) {
    res.status(401).json({
      error: "InvalidAuthor",
      message: "Provided author is not registered",
    });
    return;
  }
  // check if recipe exists in the database
  const recipeExists = await dataController.doesRecipeExistInDB(
    recipe.recipe_name
  );
  if (recipeExists) {
    res.status(409).json({ error: "Recipe already exists with that name." });
    return;
  }
  // add user id as author
  recipe.author = userTokenInfo._id;
  const newRecipe = await dataController.createNewRecipeInDB(recipe);
  if (newRecipe?.error) {
    res.status(406).json({ name: newRecipe.error, message: newRecipe.message });
  } else {
    res.status(201).json(newRecipe);
  }
};

const getSpecificRecipe = async (req, res) => {
  // get recipe id from params
  const recipe_id = req.params.recipe_id;
  // get it from the database
  const recipe = await dataController.getRecipeInDB(recipe_id);
  if (recipe?.error || recipe === null) {
    return res.status(404).json(recipe);
  }
  // add author name to the recipe and return it
  const author = await dataController.getUserFromDB("_id", recipe.author);
  recipe.author_name = author.full_name;
  res.status(200).json(recipe);
};

const updateSpecificRecipe = async (req, res) => {
  // ensure there is a recipe object with valid fields
  if (req.body.recipe === undefined) {
    res.status(400).json({ error: "Please provide a recipe object." });
    return;
  }
  const recipe = req.body.recipe;
  const missingFields = validRecipeObj(recipe);
  if (missingFields.length > 0) {
    res
      .status(406)
      .json({ error: "MissingFields", missingFields: missingFields });
    return;
  }
  // verify user
  const userTokenInfo = jwtValidation(req.header("auth-token"));
  const validUser = await dataController.userExistsInDB(
    "_id",
    userTokenInfo._id
  );
  if (!validUser) {
    res.status(401).json({
      error: "UnauthorizedUser",
      message: "Provided author is not registered",
    });
    return;
  }

  // ensure author owns the recipe
  if (recipe.author !== userTokenInfo._id) {
    return res.status(401).json({
      error: "InvalidAuthor",
      message: "User does not own recipe.",
    });
  }
  // update the recipe and return result/error
  const updateRecipe = await dataController.updateSpecificRecipeInDB(recipe);
  if (updateRecipe?.error === "UpdateFailed") {
    return res.status(400).json(updateRecipe);
  }
  if (updateRecipe?.error === "NoChange") {
    return res.status(400).json(updateRecipe);
  }
  return res.status(201).json(updateRecipe);
};

const deleteSpecificRecipe = async (req, res) => {
  const recipe_id = req.params.recipe_id;
  const userTokenInfo = jwtValidation(req.header("auth-token"));

  const recipe = await dataController.getRecipeInDB(recipe_id);
  if (userTokenInfo._id.toString() == recipe.author.toString()) {
    const result = await dataController.deleteRecipeInDB(recipe_id);
    if (result?.error) return res.status(401).json(result);
    return res.status(204).json({
      message: `Successfully deleted recipe ${
        recipe.recipe_name
      } - ${recipe._id.toString()}`,
    });
  } else {
    return res.status(401).json({
      error: "NotAuthor",
      message: "Provided user did not author the specific recipe.",
    });
  }
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getSpecificRecipe,
  updateSpecificRecipe,
  deleteSpecificRecipe,
};
