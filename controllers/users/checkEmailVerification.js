const { User } = require("../../models");
const { BadRequest, NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");

const checkEmailVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  await sendEmail({
    email: user.email,
    subject: "Registration confirmation",
    templateName: "confirmLetter",
    templateData: { verificationToken: user.verificationToken, email: user.email },
  });
  res.status(200).json({ message: `Verification email sent` });
};

module.exports = checkEmailVerification;
