const _ = require("lodash");

const { Announcement, validate } = require("../models/announcement");

module.exports.createAnnouncement = async (req, res) => {
 
  const userId = req.user._id;
  req.body.user = userId;
  i = 0;
  // const images = [ ...(req.files['images'])];
  let imagesUrl = [];
  let videosUrl = [];
  if (req.files["images"]) {
    let images = req.files["images"];
    images.forEach((image) => {
      imagesUrl.push(
        `${req.protocol}://${req.get("host")}/announcement/${image.filename}`
      );
    });
  }
  if (req.files["videos"]) {
    let videos = req.files["videos"];
    videos.forEach((video) => {
      videosUrl.push(
        `${req.protocol}://${req.get("host")}/announcement/${video.filename}`
      );
    });
  }

  req.body.imagesUrl = [...imagesUrl];
  req.body.videosUrl = [...videosUrl];

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const announcement = new Announcement({
    ...req.body,
  });

  // await announcement.save();
  // res.send(announcement);
res.send(announcement);
};
