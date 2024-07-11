require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = new mongoose.model("User", UserSchema);

module.exports = Users;
