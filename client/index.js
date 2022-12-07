require("dotenv").config();
const express = require("express");
const request = require("request");
const app = express();
const PORT = process.env.PORT || 3000;
const API_URI = process.env.POTLUCK_URI || "http://localhost:3001";

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

/*

RECIPE ROUTES

*/
app.get("/recipes", (req, res) => {
  const endpoint = `${API_URI}/recipes`;
  request.get(endpoint, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const recipes = JSON.parse(body);
      res.render("allRecipes.ejs", { recipes });
    } else {
      res.render("error.ejs");
    }
  });
});

app.post("/recipes", (req, res) => {});

// Specific recipe routes
app.get("/recipes/:recipe_id", (req, res) => {});

app.put("/recipes/:recipe_id", (req, res) => {});

app.delete("/recipes/:recipe_id", (req, res) => {});

// Comment routes for specific recipes
app.post("/recipes/:recipe_id/comments", (req, res) => {});

app.put("/recipes/:recipe_id/comments", (req, res) => {});

app.delete("/recipes/:recipe_id/comments", (req, res) => {});

/*

LOGIN SECTION

*/
app.post("/login", (req, res) => {});

/*

ACCOUNT SECTION

*/
// Account route to create an account
app.post("/account/", (req, res) => {});

// Specific user account routes
app.get("/account/:username", (req, res) => {});

app.put("/account/:username", (req, res) => {});

app.delete("/account/:username", (req, res) => {});

/*

WILDCARD ROUTE STAYS AT BOTTOM

*/
app.get("*", (req, res) => {});

app.listen(PORT, () => console.log(`Gather 'n Grub using port ${PORT}`));
