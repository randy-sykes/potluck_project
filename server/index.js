const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerSpec = YAML.load("./docs/swagger.yaml");

// To initialize the database
require("./helpers/connection");

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load swagger docs:
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Load recipes routes to /recipes
app.use("/api/recipes", require("./routes/recipes"));
app.use("/api/login", require("./routes/login"));

// Load account routes to /account
app.use("/api/account", require("./routes/account"));

// Load base routes to /
//  IMPORTANT:
// ./routes/base has a wildcard in it to catch everything.
// IT MUST BE AT THE BOTTOM!!!
app.use(require("./routes/base"));

app.listen(PORT, () => console.log(`potluck using port ${PORT}`));
