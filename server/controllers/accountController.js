const createUserAccount = (req, res) => {
  res.send("CREATE account route");
};

const getUserAccount = (req, res) => {
  res.send("GET specific user account info.");
};

const updateUserAccount = (req, res) => {
  res.send("UPDATE specific user account info.");
};

const deleteUserAccount = (req, res) => {
  res.send("DELETE specific user account info.");
};

module.exports = {
  createUserAccount,
  getUserAccount,
  updateUserAccount,
  deleteUserAccount,
};
