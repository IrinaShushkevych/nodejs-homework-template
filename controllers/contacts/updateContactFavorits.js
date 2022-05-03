// created by Irina Shushkevych
const { httpMessage } = require("../../libs/messages");
const contactService = require("../../service/contacts");

const updateContactFavorites = async (req, res) => {
  const data = contactService.updateFavorite(req.params, req.user, req.body);

  return res.status(httpMessage.OK.code).json({
    status: httpMessage.OK.message,
    code: httpMessage.OK.code,
    data,
  });
};

module.exports = updateContactFavorites;
