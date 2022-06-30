const Joi = require("joi")
const mongoose = require("mongoose");

// const deliverySchema = new mongoose.Schema({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Delivery",
// });
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 50,
  },
  // deliveries:{
  //   type: [deliverySchema],
  // }
});

const Event = mongoose.model("Event", eventSchema);

function validateEvent(event) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(event);
}

exports.Event = Event;
exports.validate= validateEvent;
