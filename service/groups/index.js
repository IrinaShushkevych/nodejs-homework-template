const { groupSchema } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");

class GroupService {
  async getAll({ id }) {
    const data = await groupSchema.Group.find({ owner: id });
    return data ? data : [];
  }

  async add({ id }, body) {
    const data = await groupSchema.Group.create({
      ...body,
      owner: id,
    });
    return data;
  }

  async remove({ id }, { groupId }) {
    const data = await groupSchema.Group.findOneAndRemove({
      $and: [{ _id: groupId }, { owner: id }],
    });

    if (!data) {
      throw new NotFound(`Group with id=${groupId} not found`);
    }

    return data;
  }

  async update({ id }, { groupId }, body) {
    try {
      const data = await groupSchema.Group.findOneAndUpdate(
        {
          $and: [{ _id: groupId }, { owner: id }],
        },
        body,
        { new: true }
      );

      return data;
    } catch (e) {
      throw new BadRequest("Group is failed");
    }
  }
}

module.exports = new GroupService();
