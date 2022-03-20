const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
