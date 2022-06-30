// const formData = require("express-form-data");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const users = require("./routes/users");
const auth = require("./routes/auth");
const events = require("./routes/events");
const deliveries = require("./routes/deliveries");
const announcements = require("./routes/announcements");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwt is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/senevent")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("could not connect to mongodb"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/events", events);
app.use("/api/deliveries", deliveries);
app.use("/api/announcements", announcements);

module.exports = app;
