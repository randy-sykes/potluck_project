const mongoose = require("mongoose");
const { Schema } = mongoose;
const { userModel } = require("./user");

const ingredientsSchema = new Schema({
  ingredient_name: {
    type: String,
    required: [true, "Please provide an ingredient name."],
  },
  measurement: {
    type: String,
    required: [true, "Please provide an ingredient measurement."],
  },
  amount: {
    type: String,
    required: [true, "Please provide an ingredient amount."],
  },
});

const commentSchema = new Schema({
  comment_text: {
    type: String,
    required: [true, "Please provided a comment"],
  },
  posted_date: {
    type: Date,
    default: Date.now,
  },
  comment_by: {
    type: String,
  },
});

const recipeSchema = new Schema({
  recipe_name: {
    type: String,
    required: [true, "Recipe name required."],
  },
  description: {
    type: String,
    required: [true, "Recipe description required."],
  },
  ingredients: [ingredientsSchema],
  directions: {
    type: String,
    required: [true, "Recipe directions required."],
  },
  servings: {
    type: Number,
  },
  prep_time: {
    type: Number,
  },
  cook_time: {
    type: Number,
  },
  author: {
    type: String,
  },
  source: {
    type: String,
    required: true,
    default: "potluck",
  },
  source_url: {
    type: String,
    required: true,
    default: "/recipe/" + mongoose.ObjectId,
  },
  tags: [{ type: String }],
  created_date: {
    type: Date,
    default: Date.now,
  },
  ratings: {
    type: mongoose.Mixed, // A mixed type object to handle ratings. Each rating level is represented in the ratings object
    1: Number, //  the key is the weight of that rating level
    2: Number,
    3: Number,
    4: Number,
    5: Number,
    get: function (ratingObj) {
      // ratingObj is the entire ratings object
      let items = Object.entries(ratingObj); // get an array of key/value pairs of the object like this [[1:1], [2:1]...]
      let sum = 0; // sum of weighted ratings
      let total = 0; // total number of ratings
      for (let [key, value] of items) {
        total += value;
        sum += value * parseInt(key); // multiply the total number of ratings by it's weight in this case which is the key
      }
      return Math.round(sum / total);
    },
    set: function (ratingObj) {
      if (!(this instanceof mongoose.Document)) {
        // only call setter when updating the whole path with an object
        if (ratingObj instanceof Object) return ratingObj;
        else {
          throw new Error("");
        }
      } else {
        // get the actual ratings object without using the getter which returns  an integer value
        // r is the ratings which is an integer value that represent the star level from 1 to 5
        if (ratingObj instanceof Object) {
          return ratingObj; // handle setting default when creating object
        }
        this.get("ratings", null, { getters: false })[ratingObj] =
          1 +
          parseInt(this.get("ratings", null, { getters: false })[ratingObj]);
        return this.get("ratings", null, { getters: false });
      } // return the updated ratings object
    },
    validate: {
      validator: function (i) {
        let b = [1, 2, 3, 4, 5]; // valid rating levels
        let v = Object.keys(i).sort();
        return b.every((x, j) => v.length === b.length && x === parseInt(v[j]));
      },
      message: "Invalid Rating Level",
    },
    default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  },
  comments: [commentSchema],
});

exports.RecipeModel = new mongoose.model("recipes", recipeSchema);
