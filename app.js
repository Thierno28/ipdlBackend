const config = require("config");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();


if(!config.get('jwtPrivateKey')) {
  console.error("FATAL ERROR: jwt is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/senevent")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("could not connect to mongodb"));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

module.exports = app;
