// created by Irina Shushkevych
const { contactSchema } = require('../../models')


const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const data = await contactSchema.Contact.findByIdAndRemove(contactId)

  if (!data){
    return next({ id: contactId, status: 404 })
  }
  
  res.status(200).json({
    status: 'ok',
    code: 200,
    data
  })
}

module.exports = removeContact