const { createEvent } = require("../controllers/event");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", createEvent);

module.exports = router;
