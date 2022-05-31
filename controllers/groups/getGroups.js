const { httpMessage } = require("../../libs/messages");
const groupService = require("../../service/groups");

const getGroups = async (req, res) => {
  const data = await groupService.getAll(req.user);
  return res.status(httpMessage.OK.code).json({
    status: httpMessage.OK.message,
    code: httpMessage.OK.code,
    data,
  });
};

module.exports = getGroups;
