const { RecipeModel } = require("../models/recipe");
const { UserModel } = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

// Recipe Functions
const getAllRecipesInDB = async () => {
  return await RecipeModel.find({}).lean();
};

const createNewRecipeInDB = async (recipe) => {
  const data = await RecipeModel.create({ ...recipe });
  if (data?.error) {
    return { error: data.name, message: data.message };
  }
  return data;
};

// Searches for a recipe name and returns a true/false value.
const doesRecipeExistInDB = async (recipe_name) => {
  return await RecipeModel.exists({ recipe_name: recipe_name });
};

const getRecipeInDB = async (recipe_id) => {
  if (!ObjectId.isValid(recipe_id))
    return {
      error: "InvalidId",
      message: "Provided recipe id is not a valid ID",
    };
  const recipe = await RecipeModel.findById(recipe_id).lean();
  if (recipe === null) {
    return {
      error: "NotFound",
      message: `No recipe found with the id ${recipe_id}`,
    };
  }
  return recipe;
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
// Function takes in the key to search for i.e. "_id" and the value it should have, and returns true or false if it was found
const userExistsInDB = async (key, value) => {
  if (key === "_id" && !ObjectId.isValid(value)) return false;
  return await UserModel.exists({ [key]: value });
};

const getUserFromDB = async (key, value) => {
  const user = await UserModel.findOne({ [key]: value })
    .lean()
    .exec();
  if (user?.full_name) {
    return user;
  }
  return {
    error: "NotFound",
    message: `Failed to find a user with ${key} of ${value}`,
  };
};

module.exports = {
  getAllRecipesInDB,
  createNewRecipeInDB,
  doesRecipeExistInDB,
  getRecipeInDB,
  createUserInDB,
  userExistsInDB,
  getUserFromDB,
};
