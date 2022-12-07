// Will handle the actual work for the login check
const loginUser = (req, res) => {
  res.send("POST login info to login to page.");
};

const createUser = (req, res) => {
  // Required keys for user obj
  const keys = ["first_name", "last_name", "email", "password"];
  const user = req.body;
  const missingFields = keys.filter((key) => !user.hasOwnProperty(key));
  if (Object.keys(user).length === 0) {
    res.status(400).json({ error: "Please provide a user object." });
  } else if (missingFields) {
    res.status(400).json({
      error: "MissingFields",
      missingFields: missingFields,
    });
  } else {
    res.status(999).send("boo");
  }
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
