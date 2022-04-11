const { Conflict, NotFound, Unauthorized, BadRequest } = require("http-errors");
const { userSchema } = require("../../models");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { appPath } = require("../../libs/path");

class UserService {
  async addUser({ name, email, password }) {
    const result = await userSchema.User.findOne({ email });
    if (result) {
      throw new Conflict("User is allready exists");
    }

    const newUser = new userSchema.User({ name, email });
    newUser.hashPassword(password);
    newUser.setAvatarFromEmail();
    newUser.save();
    return newUser;
  }
  
  async loginUser({ email, password }) {
    const user = await userSchema.User.findOne({ email });
    if (!user) {
      throw new NotFound();
    }
    const verified = user.comparePassword(password);
    if (!verified) {
      throw new Unauthorized();
    }
    user.setToken();
    user.save();
    return user;
  }

  async logoutUser({ id }) {
    await userSchema.User.findByIdAndUpdate(id, { token: null });
  }

  async getCurrentUser({ id }) {
    const user = await userSchema.User.findById(id);
    if (!user) {
      throw new Unauthorized();
    }
    return user;
  }

  async updateUser({ id }, { subscription }) {
    try {
      const user = await userSchema.User.findById(id);
      if (!user) {
        throw new NotFound(`User with id = ${id} not found`);
      }
      user.updateSubscription(subscription);
      await user.save();
      return user;
    } catch (error) {
      throw new BadRequest(error.message);
    }
  }

  async updateAvatarUser(file, { id }) {
    const url = `${appPath.avatarURL}${file.filename}`;
    const filename = `${appPath.avatarPath}${file.filename}`;
    const tmpfilename = `${appPath.tmpPath}${file.filename}`;
    try {
      const user = await userSchema.User.findById(id);
      if (!user) {
        throw new Unauthorized();
      }
      const avatar = await Jimp.read(tmpfilename);
      avatar.resize(250, 250).write(filename);
      if (user.avatarURL) {
        fs.unlink(tmpfilename);
        const fp = user.avatarURL.split("/");
        if (fp[0] !== "https:") {
          fs.unlink(`${appPath.avatarPath}${fp[fp.length - 1]}`);
        }
      }
      user.updateAvatarURL(url);
      await user.save();
      return user;
    } catch (error) {
      throw new BadRequest(error.message);
    }
  }
}

module.exports = new UserService();
