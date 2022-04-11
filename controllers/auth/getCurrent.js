// created by Irina Shushkevych
const userService = require('../../service/auth')
const { httpMessage } = require('../../libs/messages')

const getCurrent = async (req, res) => {
  const data = userService.getCurrentUser(req.user)
  res.status(httpMessage.OK.code).json({
      status: httpMessage.OK.message,
      code: httpMessage.OK.code,
      data:{
          name: data.name,
          email: data.email,
          subscription: data.subscription
      }
  })
}

module.exports = getCurrent