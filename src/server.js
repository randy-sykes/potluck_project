const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("GET Home route");
});

// Recipe routes
app.get("/recipe", (req, res) => {
  res.send("GET Recipe route");
});

app.post("/recipe", (req, res) => {
  res.send("CREATE Recipe route");
});

// Specific recipe routes
app.get("/recipe/:recipe_id", (req, res) => {
  res.send("GET Specific Recipe route");
});

app.put("/recipe/:recipe_id", (req, res) => {
  res.send("UPDATE Specific Recipe route");
});

app.delete("/recipe/:recipe_id", (req, res) => {
  res.send("DELETE Specific Recipe route");
});

// Comment routes for specific recipes
app.post("/recipe/:recipe_id/comments", (req, res) => {
  res.send("CREATE comment for specific recipe route");
});

app.put("/recipe/:recipe_id/comments", (req, res) => {
  res.send("UPDATE comment for specific recipe route");
});

app.delete("/recipe/:recipe_id/comments", (req, res) => {
  res.send("DELETE comment for specific recipe route");
});

// Account route to create an account
app.post("/account", (req, res) => {
  res.send("CREATE account route");
});

// Specific user account routes
app.get("/account/:username", (req, res) => {
  res.send("GET specific user account info.");
});

app.put("/account/:username", (req, res) => {
  res.send("UPDATE specific user account info.");
});

app.delete("/account/:username", (req, res) => {
  res.send("DELETE specific user account info.");
});

// Login route
app.post("/login", (req, res) => {
  res.send("POST login info to login to page.");
});

app.get("*", (req, res) => {
  res.status(404).send("Why are you here?");
});

module.exports = app;
