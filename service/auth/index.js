const { Conflict, NotFound, Unauthorized, BadRequest } = require("http-errors");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
const { userSchema } = require("../../models");
const { appPath } = require("../../libs/path");

class UserService {
  async sendMail(email, verificationToken) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: "Verification",
      text: `Please verify your account: http://localhost:3000/api/auth/verify/${verificationToken}`,
      html: `<h1>Please <a href='http://localhost:3000/api/auth/verify/${verificationToken}'>verify</a> your account</h1>`,
    };
    await sgMail.send(message);
  }

  async addUser({ name, email, password }) {
    const result = await userSchema.User.findOne({ email });
    if (result) {
      throw new Conflict("User is allready exists");
    }

    const verificationToken = uuidv4();
    const newUser = new userSchema.User({
      name,
      email,
      password,
      verify: true,
      verificationToken,
    });
    newUser.save();

    // this.sendMail(email, verificationToken);

    return newUser;
  }

  async loginUser({ email, password }) {
    const user = await userSchema.User.findOne({ email, verify: true });
    if (!user) {
      throw new NotFound();
    }
    const verified = await user.comparePassword(password);
    console.log(verified);
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

  async verifyUser(verificationToken) {
    const user = await userSchema.User.findOne({ verificationToken });

    if (!user) {
      throw new NotFound();
    }

    user.verificationToken = "null"; //null
    user.verify = true;
    user.save();

    return user;
  }

  async reSendMail(email) {
    const user = await userSchema.User.findOne({ email });

    if (!user) {
      throw new NotFound();
    }

    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }

    this.sendMail(email, user.verificationToken);
  }
}

module.exports = new UserService();
