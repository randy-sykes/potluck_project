app.get("/", (req, res) => {
  res.send("GET Home route");
});

app.get("*", (req, res) => {
  res.status(404).send("Why are you here?");
});
