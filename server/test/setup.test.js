process.env.NODE_ENV = "test";

const { RecipeModel } = require("../models/recipe");
const { UserModel } = require("../models/user");
require("../helpers/connection");

// Cleanup Recipes collection before starting tests
before((done) => {
  RecipeModel.deleteMany({})
    .then(() => {
      console.log("Before cleaned up after Recipes");
      done();
    })
    .catch((err) => console.log("Before failed to delete Recipes:", err));
});

// Cleanup Users collection before starting tests
before((done) => {
  UserModel.deleteMany({})
    .then(() => {
      console.log("Before cleaned up after Users");
      done();
    })
    .catch((err) => console.log("Before failed to delete Users:", err));
});

// Cleanup Recipes collection after completing tests
after((done) => {
  RecipeModel.deleteMany({})
    .then(() => {
      console.log("After cleaned up after Recipes");
      done();
    })
    .catch((err) => console.log("After failed to delete Recipes:", err));
});

// Cleanup Users collection after completing tests
after((done) => {
  UserModel.deleteMany({})
    .then(() => {
      console.log("After cleaned up after Users");
      done();
    })
    .catch((err) => console.log("After failed to delete Users:", err));
});
