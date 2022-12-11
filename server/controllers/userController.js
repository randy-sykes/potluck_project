const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dataController = require("./dataController");

// Will handle the actual work for the login check
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "Provide email and password." });
    }
    const user = await dataController.getUserFromDB("email", email);
    // Check if user exists and the password matches
    const authUser = await bcrypt.compare(password, user.password);

    if (user && authUser) {
      // Create Token
      const token = jwt.sign(
        { _id: user._id, email: email },
        process.env.TOKEN_KEY
      );
      // Return the user with the token
      res.user = {
        _id: user._id,
        authenticated: true,
        full_name: user.full_name,
      };
      // Return auth-token header and res.user back to requester
      return res.header("auth-token", token).status(200).json(res.user);
    }
    res.status(401).json({ message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  // Required keys for user obj
  const keys = ["full_name", "email", "password"];
  // Checks the req.body object to ensure it has everything required for user creation, returns missing fields if it doesn't
  const missingFields = keys.filter((key) => !req.body.hasOwnProperty(key));
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Please provide a user object." });
  } else if (missingFields.length !== 0) {
    return res.status(422).json({
      error: "MissingFields",
      missingFields: missingFields,
    });
  }
  // Create user object
  const user = {
    email: req.body.email,
    full_name: req.body.full_name,
    password: req.body.password,
  };
  // Checks if a user exists before it attempts to create it, returns response if they do
  const userExists = await dataController.userExistsInDB("email", user.email);
  if (userExists?._id.toString()) {
    return res.status(409).json({
      error: "UserExists",
      message: `User already exists with email: ${user.email}`,
    });
  }
  // Creates the user in the database
  const createdUser = await dataController.createUserInDB(user);
  return res.status(201).json({
    message: `Created user for email: ${createdUser.email}`,
    userId: `${createdUser._id.toString()}`,
  });
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
