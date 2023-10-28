const mongoose = require("mongoose");

let skema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 225,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 225,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 225,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", skema);
