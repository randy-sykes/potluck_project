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
    type: Schema.Types.ObjectId,
    ref: "user",
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
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  source: {
    type: String,
    required: true,
    default: "potluck",
  },
  tags: [{ type: String }],
  created_date: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
  image_source: {
    type: String,
    default: "",
  },
});

exports.RecipeModel = new mongoose.model("recipes", recipeSchema);
