const { httpMessage } = require("../../libs/messages");
const groupService = require("../../service/groups");

const addGroups = async (req, res) => {
  const data = await groupService.add(req.user, req.body);
  return res.status(httpMessage.CREATED.code).json({
    status: httpMessage.CREATED.message,
    code: httpMessage.CREATED.code,
    data,
  });
};

module.exports = addGroups;
