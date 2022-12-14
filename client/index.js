require("dotenv").config();
const express = require("express");
const request = require("request");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const API_URI = process.env.POTLUCK_URI || "http://localhost:3001/api";
const auth = require("./middleware/auth");

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create 24 hours in ms: milliseconds a second * seconds in a minute * minutes in an hour * hours in a day.
const oneDay = 1000 * 60 * 60 * 24;

// Setup the session for the client
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
// cookie parser middleware
app.use(cookieParser());

// Default route
app.get("/", (req, res) => {
  const user = req.session.user || { authenticated: false };
  res.render("home.ejs", {
    title: "Gather 'n Grub",
    user: user,
    errors: req.session.error,
  });
});

app.get("/about", (req, res) => {
  const user = req.session.user || { authenticated: false };
  res.render("about.ejs", {
    title: "Gather 'n Grub - About",
    user: user,
  });
});
/*

RECIPE ROUTES

*/
app.get("/recipes", (req, res) => {
  const endpoint = `${API_URI}/recipes`;
  request.get(endpoint, (error, resp, body) => {
    if (!error && resp.statusCode === 200) {
      const recipes = JSON.parse(body);
      return res.render("allRecipes.ejs", {
        title: "Gather 'n Grub - All Recipes",
        recipes,
        user: req.session.user,
      });
    }
    res.render("error.ejs", {
      title: "Gather 'n Grub - Error",
    });
  });
});

// Specific recipe routes
app.get("/recipes/:recipe_id", (req, res) => {
  const recipe_id = req.params.recipe_id;
  const endpoint = `${API_URI}/recipes/${recipe_id}`;
  let readonly = true;
  let user = req.session?.user;
  request.get(endpoint, (err, resp, body) => {
    if (!err && resp.statusCode === 200) {
      const recipe = JSON.parse(body);
      const loggedIn = user?.authenticated;
      if (loggedIn && req.session.user._id === recipe.author) {
        readonly = false;
        user = req.session.user;
      }
      return res.render("create-recipe.ejs", {
        title: `Gather 'n Grub - ${recipe.recipe_name}`,
        recipe,
        readonly,
        user,
        path: `/recipes/${recipe_id}`,
      });
    }
  });
});

app.post("/recipes/:recipe_id", (req, res) => {
  const recipe_id = req.params.recipe_id;
  const endpoint = `${API_URI}/recipes/${recipe_id}`;
  // DELETE Recipe from post
  if (req.body.send === "delete") {
    request.delete(
      {
        headers: {
          "auth-token": req.session.user.token,
        },
        url: endpoint,
      },
      (err, resp, body) => {
        console.log(resp.body);
        return res.redirect("/recipes");
      }
    );
  }

  if (req.body.send === "update") {
    res.send("Should have updated");
  }
});

// Comment routes for specific recipes
// app.post("/recipes/:recipe_id/comments", auth, (req, res) => {
//   res.send("/recipes/:recipe_id/comments POST Not setup yet");
// });

// app.put("/recipes/:recipe_id/comments", auth, (req, res) => {
//   res.send("/recipes/:recipe_id/comments PUT Not setup yet");
// });

// app.delete("/recipes/:recipe_id/comments", auth, (req, res) => {
//   res.send("/recipes/:recipe_id/comments DELETE Not setup yet");
// });

/*

CREATE RECIPE

*/
app.get("/create-recipe", auth, (req, res) => {
  res.render("create-recipe.ejs", {
    title: "Gather 'n Grub - Create Recipe",
    // user: req.session.user,
    user: req.session.user,
    path: "/create-recipe",
  });
});

app.post("/create-recipe", auth, (req, res) => {
  let error = [];
  // Get variables from the body
  const {
    recipe_name,
    description,
    directions,
    servings,
    prep_time,
    cook_time,
    ingredient_names,
    amounts,
    measurements,
    tag_string,
  } = req.body;
  // create a basic recipe object to return in case of failure
  const recipe = {
    recipe_name,
    description,
    directions,
    servings,
    prep_time,
    cook_time,
    ingredients: [],
    tags: [],
  };
  // Check if values exist
  if (
    !(
      recipe_name &&
      description &&
      directions &&
      servings &&
      prep_time &&
      cook_time &&
      ingredient_names &&
      amounts
    )
  ) {
    // Return back to create-recipe
    console.log("FAIL!");
    return res.render("create-recipe.ejs", {
      title: "Gather 'n Grub - Create Recipe",
      recipe,
      error: [{ message: "Missing values" }],
      path: "/create-recipe",
    });
  }
  // if ingredient_names is an array parse it to make the ingredients objects
  if (Array.isArray(ingredient_names)) {
    // Create ingredient objects and add them to the recipe ingredients array
    ingredient_names.forEach((i, index) => {
      if (ingredient_names[index] === "" && amounts[index] === "") return;
      if (ingredient_names[index] === "" || amounts[index] === "")
        error.push({
          message: `Missing ingredient name or amount in entry ${index + 1}`,
        });
      recipe.ingredients.push({
        ingredient_name: ingredient_names[index],
        amount: amounts[index],
        measurement: measurements[index],
      });
    });
  } else {
    // Otherwise just create 1 object for it
    recipe.ingredients.push({
      ingredient_name: ingredient_names,
      amount: amounts,
      measurement: measurements,
    });
  }
  // If there are errors return back to the page
  if (error.length > 0) {
    recipe.tag_string = tag_string;
    return res.render("create-recipe.ejs", {
      title: "Gather 'n Grub - Create Recipe",
      recipe,
      error: [{ message: "Missing ingredient name or amount" }],
      path: "/create-recipe",
    });
  }
  // split the tag_string into the array
  recipe.tags = tag_string.split(",").map((str) => str.trim());
  request.post(
    {
      headers: {
        "content-type": "application/json",
        "auth-token": req.session.user.token,
      },
      url: `${API_URI}/recipes`,
      body: JSON.stringify({ recipe: recipe }),
    },
    (err, resp, body) => {
      if (err) res.render("error.ejs", { title: "Error", error: err });

      body = JSON.parse(body);
      console.log(body);
      if (body?.error) {
        return res.render("error.ejs", { title: "Error", error: body.error });
      }
      return res.redirect(`/recipes/${body._id}`);
    }
  );
});

/*

LOGIN SECTION

*/
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Ensure email and password have data
  if (!(email && password)) return res.send("Email and Password required");
  // Next we check to see if they are valid:

  request.post(
    {
      headers: { "content-type": "application/json" },
      url: `${API_URI}/user/login`,
      body: JSON.stringify({
        email: email.toLowerCase(),
        password: password,
      }),
    },
    (err, resp, body) => {
      const session = req.session;
      if (err || resp.statusCode !== 200) {
        return res.status(401).redirect(req.headers.referer);
      }
      const token = resp.headers["auth-token"];
      const user = JSON.parse(body);
      session.user = user;
      session.user.token = token;
      res.status(200).redirect(req.headers.referer);
    }
  );
});

/*

LOGOUT!

*/
app.get("/logout", (req, res) => {
  // Delete old session
  req.session.destroy();
  // redirect back to home page
  res.redirect(req.headers.referer);
});

/*

REGISTER SECTION

*/
app.post("/register", (req, res) => {
  const { email, full_name, password, confirm_password } = req.body;
  let errors = [];
  if (!(email && full_name && password && confirm_password)) {
    errors.push({ message: "Fill in form" });
  }
  if (!(password === confirm_password)) {
    errors.push({ message: "Passwords do not match" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }

  request.post(
    {
      headers: { "content-type": "application/json" },
      url: `${API_URI}/user/register`,
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
        full_name,
      }),
    },
    function (err, resp, body) {
      const status = resp.statusCode;
      if (status === 201) {
        return res.send("Created user, please login");
      }
      if (status === 400) {
        errors.push({ message: "Please fill out the form" });
      }
      if (status === 409) {
        errors.push({ message: "Email already exists, just login." });
      }
      if (status === 422) {
        errors.push({ message: `Missing information ${body}` });
      }
      res.render("home.ejs", {
        title: "Gather 'n Grub",
        errors,
        user: {},
      });
    }
  );
});

/*

ACCOUNT SECTION

*/

// Specific user account routes
// app.get("/account", auth, (req, res) => {
//   res.send("/account GET not setup yet.");
// });

// app.put("/account", auth, (req, res) => {
//   res.send("/account PUT not setup yet.");
// });

// app.delete("/account", auth, (req, res) => {
//   res.send("/account DELETE not setup yet.");
// });

/*

WILDCARD ROUTE STAYS AT BOTTOM

*/
app.get("*", (req, res) => {
  res.send("Why are you here?");
});

app.listen(PORT, () => console.log(`Gather 'n Grub using port ${PORT}`));
