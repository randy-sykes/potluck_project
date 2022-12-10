require("dotenv").config();
const express = require("express");
const request = require("request");
const app = express();
const PORT = process.env.PORT || 3000;
const API_URI = process.env.POTLUCK_URI || "http://localhost:3001/api";

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
      return res.render("allRecipes.ejs", { recipes });
    }
    res.render("error.ejs");
  });
});

app.post("/recipes", (req, res) => {
  res.send("/recipes POST Not setup yet");
});

// Specific recipe routes
app.get("/recipes/:recipe_id", (req, res) => {
  res.send("/recipes/:recipe_id GET Not setup yet");
});

app.put("/recipes/:recipe_id", (req, res) => {
  res.send("/recipes/:recipe_id PUT Not setup yet");
});

app.delete("/recipes/:recipe_id", (req, res) => {
  res.send("/recipes/:recipe_id DELETE Not setup yet");
});

// Comment routes for specific recipes
app.post("/recipes/:recipe_id/comments", (req, res) => {
  res.send("/recipes/:recipe_id/comments POST Not setup yet");
});

app.put("/recipes/:recipe_id/comments", (req, res) => {
  res.send("/recipes/:recipe_id/comments PUT Not setup yet");
});

app.delete("/recipes/:recipe_id/comments", (req, res) => {
  res.send("/recipes/:recipe_id/comments DELETE Not setup yet");
});

/*

LOGIN SECTION

*/
app.post("/login", (req, res) => {
  res.send("/login Not setup yet");
});

/*

REGISTER SECTION

*/
app.post("/register", (req, res) => {
  const { email, full_name, password, confirm_password } = req.body;
  if (!(email && full_name && password && confirm_password)) {
    return res.send("Fill in form");
  }
  if (!(password === confirm_password)) {
    return res.send("Please check the password it doesn't match");
  }
  request.post(
    {
      headers: { "content-type": "application/json" },
      url: `${API_URI}/user/register`,
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
        first_name: full_name,
        last_name: "test",
      }),
    },
    function (err, response, body) {
      const status = response.statusCode;
      console.log(body);
      if (status === 201) {
        return res.send("Created user, please login");
      }
      if (status === 400) {
        return res.send("Please fill out the form");
      }
      if (status === 409) {
        return res.send("Email already exists, just login.");
      }
      if (status === 422) {
        return res.send(`Missing information ${body}`);
      }
    }
  );
});

/*

ACCOUNT SECTION

*/

// Specific user account routes
app.get("/account/:username", (req, res) => {
  res.send("/account/:username GET not setup yet.");
});

app.put("/account/:username", (req, res) => {
  res.send("/account/:username PUT not setup yet.");
});

app.delete("/account/:username", (req, res) => {
  res.send("/account/:username DELETE not setup yet.");
});

/*

WILDCARD ROUTE STAYS AT BOTTOM

*/
app.get("*", (req, res) => {
  res.send("Why are you here?");
});

app.listen(PORT, () => console.log(`Gather 'n Grub using port ${PORT}`));
