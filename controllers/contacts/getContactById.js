// created by Irina Shushkevych
const { httpMessage } = require('../../libs/messages')
const contactService = require('../../service/contacts')

const getContactById = async (req, res) => {
  const data = await contactService.getById(req.params, req.user)
  
  return res.status(httpMessage.OK.code).json({
    status: httpMessage.OK.message,
    code: httpMessage.OK.code,
    data,
  })
}

module.exports = getContactById
