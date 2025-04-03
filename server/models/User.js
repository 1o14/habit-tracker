const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    default: "",
  },

  lastName: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    required: false,
    trim: true,
  },

  birthday: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  imageUrl: {
    type: String,
    default: "",
  },  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
