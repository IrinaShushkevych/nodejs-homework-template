// created by Irina Shushkevych
const { httpMessage } = require('../../libs/messages');
const userService = require('../../service/auth')

const updateUser = async (req, res, next) => {
    const user = userService.updateUser(req.params, req.body)
    return res.status(httpMessage.OK.code).json({
      status: httpMessage.OK.message,
      code: httpMessage.OK.code,
      data: user,
    });

};

module.exports = updateUser;
