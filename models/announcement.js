const Joi = require("joi");
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 50,
  },
  price: {
    type: Number,
    default: null,
  },
  telephone: {
    type: String,
    require: true,
  },
  localisation: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 255,
    require: true,
  },
  isNegociable: {
    type: Boolean,
    default: true,
  },
  note: {
    type: Number,
    min: 0,
    max: 5,
    default: null,
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery",
    require: true,
  },
  imagesUrl: {
    type: [String],
  },
  videosUrl: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

function validateAnnouncement(announcement) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    price: Joi.number(),
    telephone: Joi.string().required(),
    localisation: Joi.string(),
    description: Joi.string(),
    isNegociable: Joi.boolean(),
    note: Joi.number(),
    delivery: Joi.string().required(),
    imagesUrl: Joi.array().items(Joi.string().uri()),
    videosUrl: Joi.array().items(Joi.string().uri()),
    user: Joi.string().required(),
  });
  return schema.validate(announcement);
}

exports.Announcement = Announcement;
exports.validate = validateAnnouncement;
