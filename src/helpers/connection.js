require("dotenv").config();
const mongoose = require("mongoose");
const { DB, URI, MONGO_PASSWORD, MONGO_USERNAME } = process.env;
const endpoint = `mongodb://${URI}/${DB}`;

const connectionObject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin",
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
};

mongoose
  .connect(endpoint, connectionObject)
  .then(() => console.log(`Connected to ${DB} database`))
  .catch((error) => console.log(`ERROR: connecting to ${DB}: `, error));
