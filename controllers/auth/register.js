// created by Irina Shushkevych
const userService = require('../../service/auth')
const { httpMessage } = require('../../libs/messages')

const register = async (req, res) => {
  const newUser = await userService.addUser(req.body)
   res.status(httpMessage.CREATED.code).json({
     status: httpMessage.CREATED.message,
     code: httpMessage.CREATED.code,
     data: {
       name: newUser.name,
       email: newUser.email,
       avatarURL: newUser.avatarURL,
       subscription: newUser.subscription
     }
  })
}

module.exports = register