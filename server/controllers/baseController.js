const getRoot = (req, res) => {
  res.send({
    message: "You made it, but there is nothing here. Check out /api/docs",
  });
};

const getWildcard = (req, res) => {
  res.status(404).send({ error: "Why are you here?" });
};

module.exports = {
  getRoot,
  getWildcard,
};
