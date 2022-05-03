const {httpMessage} = require('../../libs/messages')

const userService = require('../../service/auth')

const verify = async (req, res) => {
    await userService.verifyUser(req.params.verificationToken)
    return res.status(httpMessage.OK.code).json({
        status: httpMessage.OK.message,
        code: httpMessage.OK.code,
        message: 'Verification success'
    })
}

module.exports = verify