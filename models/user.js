const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { emailPattern, validateEmail } = require("../helpers");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validateEmail, "Please enter a valid email"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestaps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// ---------------- Joi schema for body when Signup / Login ----------------
const joiSchemaLogin = Joi.object({
  email: Joi.string().pattern(emailPattern).message("Enter a valid email").required(),
  password: Joi.string().min(6).required(),
});

// ---------------- Joi schema for body when Update user Status ----------------
const joiSchemaSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = { User, joiSchemaLogin, joiSchemaSubscription };
