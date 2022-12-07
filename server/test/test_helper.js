const mongoose = require("mongoose");
const { MONGO_DB, MONGO_URL, MONGO_PASSWORD, MONGO_USERNAME } = process.env;

// const ENDPOINT = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}-testing?retryWrites=true&w=majority`;

// // Use ES6 version of promises
// mongoose.Promise = global.Promise;
// mongoose.connect(ENDPOINT);

// mongoose.connection
//   .once("open", () => console.log("Connected!"))
//   .on("error", (error) => {
//     console.warn("ERROR: ", error);
//   });
