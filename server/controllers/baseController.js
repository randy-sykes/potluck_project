const getRoot = (req, res) => {
  res.send("You made it, but there is nothing here. Check out /api/docs");
};

const getWildcard = (req, res) => {
  res.status(404).send("Why are you here?");
};

module.exports = {
  getRoot,
  getWildcard,
};
