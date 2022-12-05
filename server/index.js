const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpec = require("./docs/swagger-config");

// To initialize the database
require("./helpers/connection");

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load swagger docs:
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(require("./docs/swagger-config"))
);

// Load recipes routes to /recipes
app.use("/recipes", require("./routes/recipes"));
app.use("/login", require("./routes/login"));

// Load account routes to /account
app.use("/account", require("./routes/account"));

// Load base routes to /
//  IMPORTANT:
// ./routes/base has a wildcard in it to catch everything.
// IT MUST BE AT THE BOTTOM!!!
app.use(require("./routes/base"));

app.listen(PORT, () => console.log(`potluck using port ${PORT}`));
