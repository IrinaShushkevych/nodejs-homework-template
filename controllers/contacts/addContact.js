// created by Irina Shushkevych
const { httpMessage } = require('../../libs/messages')
const contactService = require('../../service/contacts')

const addContact = async (req, res, next) => {
  const data = await contactService.add(req.user, req.body)
  return res.status(httpMessage.CREATED.code).json({
    status: httpMessage.CREATED.message,
    code: httpMessage.CREATED.code,
    data,
  })
}

module.exports = addContact
