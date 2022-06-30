const { createDelivery, getAllDeliveries, updateDelivery } = require("../controllers/delivery");
const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.post("/", createDelivery);
router.get("/", getAllDeliveries);
router.put("/:id", updateDelivery);
module.exports = router;
