process.env.NODE_ENV = "test";

const { RecipeModel } = require("../models/recipe");
const { UserModel } = require("../models/user");
const mongoose = require("mongoose");
const { MONGO_DB, MONGO_URL, MONGO_PASSWORD, MONGO_USERNAME } = process.env;
// const endpoint = `mongodb://${MONGO_URL}/${MONGO_DB}`;
const endpoint = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority`;

// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
mongoose.connect(endpoint);

mongoose.connection
  .once("open", () => {})
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

before((done) => {
  RecipeModel.deleteMany({}, function (err) {});
  UserModel.deleteMany({}, function (err) {});
  done();
});

after((done) => {
  RecipeModel.deleteMany({}, function (err) {});
  UserModel.deleteMany({}, function (err) {});
  done();
});
