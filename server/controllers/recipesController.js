const dataController = require("./dataController");
const { jwtValidation } = require("../helpers/validations");

const getAllRecipes = async (req, res) => {
  const result = await dataController.getAllRecipesInDB();
  if (result?.error) {
    res.status(500).json({ error: result.message });
  } else {
    res.json(result);
  }
};

const createNewRecipe = async (req, res) => {
  if (req.body.recipe === undefined) {
    res.status(400).json({ error: "Please provide a recipe object." });
    return;
  }
  const recipe = req.body.recipe;
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
  if (missingFields.length > 0) {
    res
      .status(406)
      .json({ error: "MissingFields", missingFields: missingFields });
    return;
  }
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
  const recipeExists = await dataController.doesRecipeExistInDB(
    recipe.recipe_name
  );
  if (recipeExists) {
    res.status(409).json({ error: "Recipe already exists with that name." });
    return;
  }
  recipe.author = userTokenInfo._id;
  const newRecipe = await dataController.createNewRecipeInDB(recipe);
  if (newRecipe?.error) {
    res.status(406).json({ name: newRecipe.error, message: newRecipe.message });
  } else {
    res.status(201).json(newRecipe);
  }
};

const getSpecificRecipe = (req, res) => {
  const recipe_id = Number(req.params.recipe_id);
  const recipe = dataController.getRecipeInDB(recipe_id);
  res.json(recipe);
};

const updateSpecificRecipe = (req, res) => {
  res.send("UPDATE Specific Recipe route");
};

const deleteSpecificRecipe = (req, res) => {
  const recipe_id = Number(req.params.recipe_id);
  const recipe = dataController.getRecipeInDB(recipe_id);
  if (user !== recipe.author) {
    res.send("User did not create recipe.");
  } else {
    const result = dataController.deleteRecipeInDB(recipe_id);
    res.send("DELETE Specific Recipe route");
  }
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getSpecificRecipe,
  updateSpecificRecipe,
  deleteSpecificRecipe,
};
