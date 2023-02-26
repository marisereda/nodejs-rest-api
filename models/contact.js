const { Schema, SchemaTypes, model } = require("mongoose");
const Joi = require("joi");
const { emailPattern, validateEmail } = require("../helpers");

// ---------------- MongoDB schema ----------------
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      validate: [validateEmail, "Please enter a valid email"],
      default: "",
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// ---------------- Joi schema for param id ----------------
const joiSchemaAddContactId = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

// ---------------- Joi schema for body when add contact ----------------
const joiSchemaAddContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).message("Enter a valid email"),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

// ---------------- Joi schema for body when update contact ----------------
const joiSchemaUpdateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailPattern).message("Enter a valid email"),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

// ---------------- Joi schema for body when update favorite status ----------------
const joiSchemaStatus = Joi.object({
  favorite: Joi.bool().required(),
});

// ---------------- Joi schema for filter query ----------------
const joiSchemaFilter = Joi.object({
  favorite: Joi.bool(),
  name: Joi.string(),
  email: Joi.string(),
  page: Joi.number(),
  limit: Joi.number(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchemaAddContact,
  joiSchemaAddContactId,
  joiSchemaUpdateContact,
  joiSchemaStatus,
  joiSchemaFilter,
};
