const { Event, validate } = require("../models/event");

module.exports.createEvent = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let event = new Event({
    name: req.body.name,
  });
  event = await event.save();
  res.send(event);
};
