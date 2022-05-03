// created by Irina Shushkevych
const userService = require('../../service/auth')
const { httpMessage } = require('../../libs/messages')


const logout = async (req, res) => {
  await userService.logoutUser(req.user)
  return res.status(httpMessage.NORESPONSE.code).json({
    status: httpMessage.NORESPONSE.message,
    code: httpMessage.NORESPONSE.code
  })
}

module.exports = logout