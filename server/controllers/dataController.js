const { RecipeModel } = require("../models/recipe");
const { UserModel } = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

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
// Function takes in the key to search for i.e. "_id" and the value it should have
const userExistsInDB = async (key, value) => {
  if (key === "_id" && !ObjectId.isValid(value)) return false;
  return await UserModel.exists({ [key]: value });
};

const getUserFromDB = async (key, value) => {
  return await UserModel.findOne({ [key]: value })
    .lean()
    .exec();
};

module.exports = {
  getAllRecipesInDB,
  createNewRecipeInDB,
  doesRecipeExistInDB,
  createUserInDB,
  userExistsInDB,
  getUserFromDB,
};
