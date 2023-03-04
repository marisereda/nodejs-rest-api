const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const crypto = require("crypto");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const verificationToken = crypto.randomUUID();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }

  const avatarURL = gravatar.url(email, { protocol: "http" });
  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
  await sendEmail({ email: newUser.email, verificationToken: newUser.verificationToken });

  res
    .status(201)
    .json({ user: { email: newUser.email, subscription: newUser.subscription, avatar: newUser.avatarURL } });
};

module.exports = signup;
