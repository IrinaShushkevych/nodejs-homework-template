const { httpMessage } = require("../../libs/messages");
const groupService = require("../../service/groups");

const removeGroups = async (req, res) => {
  const data = await groupService.remove(req.user, req.params);
  return res.status(httpMessage.NORESPONSE.code).json({
    status: httpMessage.NORESPONSE.message,
    code: httpMessage.NORESPONSE.code,
    data,
  });
};

module.exports = removeGroups;
