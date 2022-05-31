const { contactSchema } = require("../../models");
const { NotFound } = require("http-errors");

class ContactService {
  async add({ id }, body) {
    const data = await contactSchema.Contact.create({
      ...body,
      owner: id,
    });
    return data;
  }

  async getById({ contactId }, { id }) {
    const data = await contactSchema.Contact.findOne({
      $and: [{ _id: contactId }, { owner: id }],
    });

    if (!data) {
      throw new NotFound(`Contacts with id = ${contactId} not found`);
    }

    return data;
  }

  async getList({ id }, { page = 1, limit = 10, favorite }) {
    let condition = null;
    if (favorite) {
      condition = {
        $and: [{ owner: id }, { favorite }],
      };
    } else {
      condition = { owner: id };
    }
    const allData = await contactSchema.Contact.find(condition);
    const data = await contactSchema.Contact.find(condition, "", {
      skip: (page - 1) * limit,
      limit: Number(limit),
    });
    let total = Math.floor(allData.length / limit);
    if (allData.length % limit > 0) {
      total += 1;
    }
    return { length: allData.length, total, data };
  }

  async remove({ contactId }, { id }) {
    const data = await contactSchema.Contact.findOneAndRemove({
      $and: [{ _id: contactId }, { owner: id }],
    });

    if (!data) {
      throw new NotFound(`Contacts with id = ${contactId} not found`);
    }

    return data;
  }

  async update({ contactId }, { id }, body) {
    const data = await contactSchema.Contact.findOneAndUpdate(
      {
        $and: [{ _id: contactId }, { owner: id }],
      },
      body,
      { new: true }
    );

    if (!data) {
      throw new NotFound(`Contacts with id = ${contactId} not found`);
    }

    return data;
  }

  async updateFavorite({ contactId }, { id }, { favorite }) {
    const data = await contactSchema.Contact.findOneAndUpdate(
      {
        $and: [{ _id: contactId }, { owner: id }],
      },
      { favorite },
      { new: true }
    );

    if (!data) {
      throw new NotFound(`Contacts with id = ${contactId} not found`);
    }

    return data;
  }
}

module.exports = new ContactService();
