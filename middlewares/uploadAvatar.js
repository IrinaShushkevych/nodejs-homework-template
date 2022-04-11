const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp");
  },
  filename: function (req, file, cb) {
    const originFileName = file.originalname.split(".");
    cb(null, `avatar_${req.user.id}_${Date.now()}.${originFileName[1]}`);
  },
});

const uploadAvatar = multer({ storage });

module.exports = { uploadAvatar };
