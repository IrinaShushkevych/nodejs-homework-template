// created by Irina Shushkevych
const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required. Set name for contact"],
      minlength: 2,
    },
    email: {
      type: String,
      default: null,
    },
    phone_mob1: {
      type: String,
      minlength: 7,
    },
    phone_mob2: {
      type: String,
      minlength: 7,
      default: null,
    },
    phone_home: {
      type: String,
      minlength: 7,
      default: null,
    },
    phone_work: {
      type: String,
      minlength: 7,
      default: null,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "groups",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
