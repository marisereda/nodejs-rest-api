const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyUserEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true }, { new: true });
  res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyUserEmail;