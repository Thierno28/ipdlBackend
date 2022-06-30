const auth = require("../middlewares/auth");
const { multer } = require("../middlewares/multer-config");
const { createAnnouncement } = require("../controllers/announcement");
const express = require("express");
const router = express.Router();

router.post("/",auth,multer, createAnnouncement);
// router.get("/", getAllAnnouncement);
// router.put("/:id", updateAnnouncement);
module.exports = router;
