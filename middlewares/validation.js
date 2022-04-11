// created by Irina Shushkevych
const {BadRequest} = require('http-errors')

const validate = (schema) => {
  return (req, res, next) => {
    const {error} = schema.validate(req.body)
    if (error) {
      next(BadRequest(error.message))
    }
    next()
  }
}


module.exports = { validate }
