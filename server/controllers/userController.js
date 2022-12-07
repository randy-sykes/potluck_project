// Will handle the actual work for the login check
const loginUser = (req, res) => {
  res.send("POST login info to login to page.");
};

const createUser = (req, res) => {
  res.send("CREATE user route");
};

const getUser = (req, res) => {
  res.send("GET specific user account info.");
};

const updateUser = (req, res) => {
  res.send("UPDATE specific user account info.");
};

const deleteUser = (req, res) => {
  res.send("DELETE specific user account info.");
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
};
