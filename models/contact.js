const { Schema, model } = require("mongoose");
const Joi = require("joi");

// ---------------- MongoDB schema ----------------
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: ["Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// ---------------- Joi schema for param id ----------------
const joiSchemaParams = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

// ---------------- Joi schema for body ----------------
const joiSchemaBody = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

// ---------------- Joi schema for body favorite status ----------------
const joiSchemaStatus = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchemaBody, joiSchemaParams, joiSchemaStatus };
