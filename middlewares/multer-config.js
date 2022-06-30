const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "video/mp4": "mp4",
  "video/mkv": "mkv",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "announcement");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + "." + name);
  },
});

exports.multer = multer({ storage: storage }).fields([
  { name: "images" },
  { name: "videos" },
]);
