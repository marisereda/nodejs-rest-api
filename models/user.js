const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { emailPattern, validateEmail } = require('../helpers');

const userSchema = Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: [validateEmail, 'Please enter a valid email'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      // required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
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

// ---------------- Joi schema for body when Signup ----------------
const joiSchemaSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(emailPattern)
    .message('Enter a valid email')
    .required(),
  password: Joi.string().min(6).required(),
});
// ---------------- Joi schema for body when Login ----------------
const joiSchemaLogin = Joi.object({
  email: Joi.string()
    .pattern(emailPattern)
    .message('Enter a valid email')
    .required(),
  password: Joi.string().min(6).required(),
});

// ---------------- Joi schema for body when Update user Status ----------------
const joiSchemaSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

// ---------------- Joi schema for body when check Email Verification ----------------
const joiSchemaVerify = Joi.object({
  email: Joi.string()
    .pattern(emailPattern)
    .message('Enter a valid email')
    .required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchemaSignUp,
  joiSchemaLogin,
  joiSchemaSubscription,
  joiSchemaVerify,
};
