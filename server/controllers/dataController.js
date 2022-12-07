const { RecipeModel } = require("../models/recipe");

const getAllRecipes = async () => {
  return await RecipeModel.find({});
};

const createNewRecipe = async (recipe) => {
  const data = await RecipeModel.create({ ...recipe });
  if (data?.error) {
    return { error: data.name, message: data.message };
  } else {
    return data;
  }
};

const doesRecipeExistInDB = async (recipe_name) => {
  return await RecipeModel.exists({ recipe_name: recipe_name });
};

module.exports = {
  getAllRecipes,
  createNewRecipe,
  doesRecipeExistInDB,
};
