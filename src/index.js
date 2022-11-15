const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.static("public"));

// Load base routes to /
app.use(require("./routes/base"));

// Load recipes routes to /recipes
app.use("/recipes", require("./routes/recipes"));

app.listen(PORT, () => console.log(`potluck using port ${PORT}`));
