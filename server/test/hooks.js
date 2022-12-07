process.env.NODE_ENV = "test";
require("../helpers/connection");

const { RecipeModel } = require("../models/recipe");
const { UserModel } = require("../models/user");

exports.mochaHooks = {
  beforeEach: [
    (done) => {
      RecipeModel.deleteMany({})
        .then(() => {
          done();
        })
        .catch((err) => console.log("Before failed to delete Recipes:", err));
    },
    (done) => {
      UserModel.deleteMany({})
        .then(() => {
          done();
        })
        .catch((err) => console.log("Before failed to delete Users:", err));
    },
  ],
  afterAll: [
    (done) => {
      RecipeModel.deleteMany({})
        .then(() => {
          done();
        })
        .catch((err) => console.log("After failed to delete Recipes:", err));
    },
    (done) => {
      UserModel.deleteMany({})
        .then(() => {
          done();
        })
        .catch((err) => console.log("After failed to delete Users:", err));
    },
  ],
};
