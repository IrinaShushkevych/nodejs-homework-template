// created by Irina Shushkevych
const Jimp = require("jimp");
const fs = require("fs/promises");
const { BadRequest, Unauthorized } = require("http-errors");
const { userSchema } = require("../../models");

const updateAvatars = async (req, res, next) => {
  const url = `/avatars/${req.file.filename}`;
  const filename = `./public/avatars/${req.file.filename}`;
  const tmpfilename = `./tmp/${req.file.filename}`;
  try {
    const { id } = req.user;
    const user = await userSchema.User.findById(id);
    if (!user) {
      return next(Unauthorized());
    }
    const avatar = await Jimp.read(tmpfilename);
    avatar.resize(250, 250).write(filename);
    fs.rm(tmpfilename);
    user.updateAvatarURL(url);
    await user.save();
    res.status(200).json({
      status: "ok",
      code: 200,
      data: { avatarURL: user.avatarURL },
    });
  } catch (error) {
    next(BadRequest(error.message));
  }
};

module.exports = updateAvatars;
