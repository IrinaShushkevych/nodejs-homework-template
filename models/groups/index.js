const joi = require("./validationSchema");
const Group = require("./model");

module.exports = { Group, ...joi };
