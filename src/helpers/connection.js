require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_DB, MONGO_URI, MONGO_PASSWORD, MONGO_USERNAME } = process.env;
// const endpoint = `mongodb://${MONGO_URL}/${MONGO_DB}`;
const endpoint = MONGO_URI;

// const connectionObject = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   authSource: "admin",
//   user: MONGO_USERNAME,
//   pass: MONGO_PASSWORD,
// };

const connectionObject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(endpoint, connectionObject)
  .then(() => console.log(`Connected to ${MONGO_DB} database`))
  .catch((error) => console.log(`ERROR: connecting to ${MONGO_DB}: `, error));
