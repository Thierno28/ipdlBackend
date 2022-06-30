const { Delivery, validate } = require("../models/Delivery");

module.exports.createDelivery = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let delivery = new Delivery({
    name: req.body.name,
    events: req.body.events,
  });
  delivery = await delivery.save();
  res.send(delivery);
};

module.exports.getAllDeliveries = async (req, res) => {
  const deliveries = await Delivery.find()
    .populate("events", "name")
    .select("name events")
    .sort("name");
  res.send(deliveries);
};

module.exports.updateDelivery = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const delivery = await Delivery.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        events: [...req.body.events],
      },
    },
    {
      new: true,
    }
  );

  if (!delivery)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(delivery);
};
