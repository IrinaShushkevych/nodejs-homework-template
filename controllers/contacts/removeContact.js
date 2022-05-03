// created by Irina Shushkevych
const { httpMessage } = require("../../libs/messages");
const contactService = require("../../service/contacts");

const removeContact = async (req, res) => {
  const data = contactService.remove(req.params, req.user);

  return res.status(httpMessage.OK.code).json({
    status: httpMessage.OK.message,
    code: httpMessage.OK.code,
    data,
  });
};

module.exports = removeContact;
