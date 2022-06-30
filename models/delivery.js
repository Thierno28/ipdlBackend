const Joi = require("joi");
const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 50,
  },
  events: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Event",
  },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

function validateDelivery(delivery) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    events: Joi.array().items(Joi.string()).required(),
  });
  return schema.validate(delivery);
}

exports.Delivery = Delivery;
exports.validate = validateDelivery;
