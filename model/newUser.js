const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const newUserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase:true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    trim: true,
  }
});

newUserSchema.statics.findByCredentials = async (email, password) => {
  const user = await newUser.findOne({ email });
  if (!user) {
    throw new Error({error:"unable to login"});
  }
  const isMatch = (password === user.password);
  if (!isMatch) {
    throw new Error({error:"unable to login"});
  }
  return user;
};


const newUser = mongoose.model("newUser", newUserSchema);

module.exports = newUser;
