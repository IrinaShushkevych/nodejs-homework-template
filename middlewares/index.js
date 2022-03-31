// created by Irina Shushkevych
const { sendError } = require('./sendError')
const { ctrlWrapper } = require('./ctrlWrapper')
const { validate } = require('./validation')
const  { auth } = require('./auth')
const { uploadAvatar } = require('./uploadAvatar')

module.exports = { ctrlWrapper, sendError, validate, auth, uploadAvatar }
