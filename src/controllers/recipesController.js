const getAllRecipes = (req, res) => {
  const data = fakeData;
  res.render("allRecipes.ejs", { data });
};

const createNewRecipe = (req, res) => {
  res.send("CREATE Recipe route");
};

const getSpecificRecipe = (req, res) => {
  res.send("GET Specific Recipe route");
};

const updateSpecificRecipe = (req, res) => {
  res.send("UPDATE Specific Recipe route");
};

const deleteSpecificRecipe = (req, res) => {
  res.send("DELETE Specific Recipe route");
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getSpecificRecipe,
  updateSpecificRecipe,
  deleteSpecificRecipe,
};
