const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    default: "",
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    // check registration method
    const user = this;
    if (!user.isModified("password")) next();
    // generate salt value
    const sale = await bcrypt.genSalt(10);
    // create the hash for the password
    const hashedPass = await bcrypt.hash(user.password, salt);
    // replace the plaintext password
    user.password = hashedPass;
    next();
  } catch (err) {
    console.log("ERROR, pre-save user info: ", err);
    return next(err);
  }
});

const UserModel = new mongoose.model("user", userSchema);
module.exports = {
  UserModel,
  userSchema,
};