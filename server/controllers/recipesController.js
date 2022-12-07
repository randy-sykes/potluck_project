const { RecipeModel } = require("../models/recipe");
const dataController = require("./dataController");

const getAllRecipes = async (req, res) => {
  const result = await dataController.getAllRecipes();
  if (result?.error) {
    res.status(500).json({ error: result.message });
  } else {
    res.json({ data: result });
  }
};

const createNewRecipe = async (req, res) => {
  const { recipe_name } = req.body?.recipe || "No Recipe provided";
  if (recipe_name == "No Recipe provided") {
    res.status(401).json({ error: "Please provide a validate recipe." });
  } else {
    const recipe = req.body.recipe;
    const recipeExists = await dataController.doesRecipeExistInDB(recipe_name);
    if (recipeExists) {
      res.status(403).json({ error: "Recipe already exists with that name." });
    } else {
      const newRecipe = await dataController.createNewRecipe(recipe);
      console.log(newRecipe);
      if (newRecipe?.error) {
        res
          .status(406)
          .json({ name: newRecipe.error, message: newRecipe.message });
      } else {
        res.status(201).json(result);
      }
    }
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
