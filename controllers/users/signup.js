const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

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

  const letter = {
    to: newUser.email,
    from: "marina.gorb@gmail.com",
    subject: "Registration confirmation",
    text: `<p>Please <a href='http://localhost:3000/api/users/verify/${verificationToken}'>confirm</a> your email.</p>`,
    html: `<p>Please <a href='http://localhost:3000/api/users/verify/${verificationToken}'>confirm</a> your email.</p>`,
  };

  try {
    await sgMail.send(letter);
    console.log("Email was sent successfully");
  } catch (error) {
    console.log(error.message);
    throw new Error("Sendgrid is not available.");
  }

  res
    .status(201)
    .json({ user: { email: newUser.email, subscription: newUser.subscription, avatar: newUser.avatarURL } });
};

module.exports = signup;
