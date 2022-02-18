// created by Irina Shushkevych
const { contactSchema } = require('../../models')


const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const data = await contactSchema.Contact.findByIdAndUpdate(contactId, req.body, { new: true })
 
  if (!data){
    return next({ id: contactId, status: 404 })
  }

  res.status(200).json({
    status: 'ok',
    code: 200,
    data,
  })
}

module.exports = updateContact