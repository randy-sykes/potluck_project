const mongoose = require("mongoose");
require("dotenv-flow").config();
const { MONGO_DB, MONGO_URL, MONGO_PASSWORD, MONGO_USERNAME } = process.env;
// const endpoint = `mongodb://${MONGO_URL}/${MONGO_DB}`;
const endpoint = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority`;

const connectionObject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(endpoint, connectionObject)
  .then(() => {
    // Check to not show connected message in production or test env
    if (!["production", "test"].includes(process.env.NODE_ENV))
      console.log(`Connected to ${MONGO_DB} database`);
  })
  .catch((error) => console.log(`ERROR: connecting to ${MONGO_DB}: `, error));
