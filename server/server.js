const express = require("express");
const server = express();
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerSpec = YAML.load("./docs/swagger.yaml");

// Load config from .env files
require("dotenv-flow").config();
// Check to not start morgan if running in test or production env
if (!["production", "test"].includes(process.env.NODE_ENV)) {
  const morgan = require("morgan");
  server.use(morgan("dev"));
}

// To initialize the database
require("./helpers/connection");

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Load swagger docs:
server.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Load recipes routes to /recipes
server.use("/api/recipes", require("./routes/recipes"));

// Load account routes to /account
server.use("/api/user", require("./routes/user"));

// Load base routes to /
//  IMPORTANT:
// ./routes/base has a wildcard in it to catch everything.
// IT MUST BE AT THE BOTTOM!!!
server.use(require("./routes/base"));

module.exports = server;
