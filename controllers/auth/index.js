// created by Irina Shushkevych
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateUser = require("./updateUser");
const updateAvatars = require("./updateAvatars");
const verify = require("./verify");
const reVerification = require("./reVerification");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateUser,
  updateAvatars,
  verify,
  reVerification,
};
