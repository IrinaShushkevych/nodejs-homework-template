// created by Irina Shushkevych
const { httpMessage } = require('../../libs/messages')
const contactService = require('../../service/contacts')

const listContacts = async (req, res) => {
  const list = await contactService.getList(req.user, req.query)

  return res.status(httpMessage.OK.code).json({
    status: httpMessage.OK.message,
    code: httpMessage.OK.code,
    total: list.length,
    totalPage: list.total,
    data: list.data
  })
}

module.exports = listContacts
