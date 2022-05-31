// created by Irina Shushkevych
const { Schema, model } = require("mongoose");

const groupSchema = Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      require: [true, "Name is equired. Set name for group"],
    },
    color: {
      type: String,
      require: [true, "Color is required."],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Group = model("groups", groupSchema);

module.exports = Group;
