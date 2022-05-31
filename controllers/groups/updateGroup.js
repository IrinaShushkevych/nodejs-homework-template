const { httpMessage } = require("../../libs/messages");
const groupService = require("../../service/groups");

const getGroups = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const data = await groupService.update(req.user, req.params, req.body);
  console.log(data);
  return res.status(httpMessage.OK.code).json({
    status: httpMessage.OK.message,
    code: httpMessage.OK.code,
    data,
  });
};

module.exports = getGroups;
