const { RecipeModel } = require("../models/recipe");
const { UserModel } = require("../models/user");

// Recipe Functions
const getAllRecipesInDB = async () => {
  return await RecipeModel.find({});
};

const createNewRecipeInDB = async (recipe) => {
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

// User Functions
const createUserInDB = async (user) => {
  const data = await UserModel.create({ ...user });
  if (data?.error) {
    return { error: data.name, message: data.message };
  } else {
    return data;
  }
};

const userExistsInDB = async (user) => {
  return await UserModel.exists({ email: user.email });
};

module.exports = {
  getAllRecipesInDB,
  createNewRecipeInDB,
  doesRecipeExistInDB,
  createUserInDB,
  userExistsInDB,
};
