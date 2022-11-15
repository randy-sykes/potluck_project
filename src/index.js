const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.static("public"));

// Load recipes routes to /recipes
app.use("/recipes", require("./routes/recipes"));

// Load account routes to /account
app.use("/account", require("./routes/account"));

// Load base routes to /
//  IMPORTANT:
// ./routes/base has a wildcard in it to catch everything.
// IT MUST BE AT THE BOTTOM!!!
app.use(require("./routes/base"));

app.listen(PORT, () => console.log(`potluck using port ${PORT}`));
