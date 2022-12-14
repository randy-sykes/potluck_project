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

const getSpecificRecipe = async (req, res) => {
  const recipe_id = req.params.recipe_id;
  const recipe = await dataController.getRecipeInDB(recipe_id);
  if (recipe?.error || recipe === null) {
    return res.status(404).json(recipe);
  }
  const author = await dataController.getUserFromDB("_id", recipe.author);
  recipe.author_name = author.full_name;
  res.status(200).json(recipe);
};

const updateSpecificRecipe = (req, res) => {
  res.send("UPDATE Specific Recipe route");
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
