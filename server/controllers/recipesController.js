const dataController = require("./dataController");

const getAllRecipes = async (req, res) => {
  res.json(await dataController.getAllRecipes());
};

const createNewRecipe = (req, res) => {
  res.send("CREATE Recipe route");
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
