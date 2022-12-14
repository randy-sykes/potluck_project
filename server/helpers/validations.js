const jwt = require("jsonwebtoken");

function jwtValidation(token) {
  return jwt.verify(token, process.env.TOKEN_KEY);
}

const validId = (id, idType) => {
  if (!ObjectId.isValid(id))
    return {
      error: "InvalidId",
      message: `Provided ${type} id is not a valid ID`,
    };
  return true;
};

const validRecipeId = (recipe_id) => {
  return validId(recipe_id, "recipe");
};

module.exports = {
  jwtValidation,
  validRecipeId,
};
