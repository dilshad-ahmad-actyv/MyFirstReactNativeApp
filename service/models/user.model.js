const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter the passworld"],
      trim: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
