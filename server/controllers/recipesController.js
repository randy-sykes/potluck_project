const { RecipeModel } = require("../models/recipe");

const getAllRecipes = async (req, res) => {
  RecipeModel.find({}, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ data: result });
    }
  });
};

const createNewRecipe = async (req, res) => {
  const { recipe_name } = req.body.recipe;
  const recipe = req.body.recipe;
  const recipeExists = await RecipeModel.exists({ recipe_name: recipe_name });
  if (recipeExists) {
    res.status(403).json({ error: "Recipe already exists with that name." });
  } else {
    RecipeModel.create({ ...recipe }, (err, result) => {
      if (err) {
        res.status(406).json({ name: err.name, message: err.message });
      } else {
        res.json(result);
      }
    });
  }
};

const getSpecificRecipe = (req, res) => {
  const recipe_id = Number(req.params.recipe_id);
  const recipe = dataController.getRecipe(recipe_id);
  res.json(recipe);
};

const updateSpecificRecipe = (req, res) => {
  res.send("UPDATE Specific Recipe route");
};

const deleteSpecificRecipe = (req, res) => {
  const recipe_id = Number(req.params.recipe_id);
  const recipe = dataController.getRecipe(recipe_id);
  if (user !== recipe.author) {
    res.send("User did not create recipe.");
  } else {
    const result = dataController.deleteRecipe(recipe_id);
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
