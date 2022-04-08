// created by Irina Shushkevych
const userService = require("../../service/auth");
const { httpMessage } = require('../../libs/messages')

const updateAvatars = async (req, res, next) => {
  const user = await userService.updateAvatarUser(req.file, req.user);
  res.status(httpMessage.OK.code).json({
    status: httpMessage.OK.message,
    code: httpMessage.OK.code,
    data: { avatarURL: user.avatarURL },
  });
};

module.exports = updateAvatars;
