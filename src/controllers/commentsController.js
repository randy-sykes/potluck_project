const createComment = (req, res) => {
  res.send("CREATE comment for specific recipe route");
};

const updateComment = (req, res) => {
  res.send("UPDATE comment for specific recipe route");
};

const deleteComment = (req, res) => {
  res.send("DELETE comment for specific recipe route");
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
