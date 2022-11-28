const getRoot = (req, res) => {
  res.send("GET Home route");
};

const getWildcard = (req, res) => {
  res.status(404).send("Why are you here?");
};

module.exports = {
  getRoot,
  getWildcard,
};
