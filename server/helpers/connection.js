// Added this one so I could change the env files with .env.<ENV> i.e. .env.test and .env.dev
require("custom-env").env();

const mongoose = require("mongoose");
const { MONGO_DB, MONGO_URL, MONGO_PASSWORD, MONGO_USERNAME } = process.env;
// const endpoint = `mongodb://${MONGO_URL}/${MONGO_DB}`;
const endpoint = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority`;

const connectionObject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(endpoint, connectionObject)
  .then(() => console.log(`Connected to ${MONGO_DB} database`))
  .catch((error) => console.log(`ERROR: connecting to ${MONGO_DB}: `, error));
