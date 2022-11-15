// Account route to create an account
app.post("/", (req, res) => {
  res.send("CREATE account route");
});

// Specific user account routes
app.get("/:username", (req, res) => {
  res.send("GET specific user account info.");
});

app.put("/:username", (req, res) => {
  res.send("UPDATE specific user account info.");
});

app.delete("/:username", (req, res) => {
  res.send("DELETE specific user account info.");
});
