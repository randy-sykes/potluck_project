const dataController = require("./dataController");

const getAllRecipes = (req, res) => {
  const data = dataController.getAllRecipes();
  data
    .then((result) => {
      const recipes = result.map((recipe) => {
        let retData = {
          _id: recipe._id,
          recipe_name: recipe.recipe_name,
          description: recipe.description,
          author: recipe.author,
          source: recipe.source,
          source_url: recipe.source_url,
        };
        if (!retData.author) retData.author = "";
        return retData;
      });
      res.render("allRecipes.ejs", { recipes });
    })
    .catch((err) => {
      res.render("errorPage.ejs", { error: err, msg: "Failed to get recipes" });
    });
};

const createNewRecipe = (req, res) => {
  res.send("CREATE Recipe route");
};

const getSpecificRecipe = (req, res) => {
  const recipe_id = Number(req.params.recipe_id);
  const recipe = dataController.getRecipe(recipe_id);
  res.render("recipe.ejs", { recipe });
};

const updateSpecificRecipe = (req, res) => {
  res.send("UPDATE Specific Recipe route");
};

const deleteSpecificRecipe = (req, res) => {
  const recipe_id = Number(req.params.recipe_id);
  const recipe = dataController.getRecipe(recipe_id);
  if (user !== recipe.author) {
    res.send("User did not create recipe.");
  } else {
    const result = dataController.deleteRecipe(recipe_id);
    res.send("DELETE Specific Recipe route");
  }
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getSpecificRecipe,
  updateSpecificRecipe,
  deleteSpecificRecipe,
};
