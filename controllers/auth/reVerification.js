const {BadRequest} = require('http-errors')
const userService = require('../../service/auth')
const {httpMessage} = require('../../libs/messages')

const reVerification = async (req, res) => {
   const email = req.body.email

   if (!email){
       throw new BadRequest('Missing required field email')
   }

   await userService.reSendMail(email)

   res.status(httpMessage.OK.code).json({
       status: httpMessage.OK.message,
       code: httpMessage.OK.code
   })
}

module.exports = reVerification