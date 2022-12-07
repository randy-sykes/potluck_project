const express = require("express");
const server = express();
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerSpec = YAML.load("./docs/swagger.yaml");

// Load config from .env files
require("dotenv-flow").config();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
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
server.use("/api/login", require("./routes/login"));

// Load account routes to /account
server.use("/api/account", require("./routes/account"));

// Load base routes to /
//  IMPORTANT:
// ./routes/base has a wildcard in it to catch everything.
// IT MUST BE AT THE BOTTOM!!!
server.use(require("./routes/base"));

module.exports = server;
