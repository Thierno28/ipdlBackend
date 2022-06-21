const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
    minlength: 5,
    maxlength: 50,
  },
  lastname: {
    type: String,
    default: null,
    minlength: 5,
    maxlength: 50,
  },
  pseudo: {
    type: String,
    minlength: 3,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  inscriptionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id},
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    pseudo: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
