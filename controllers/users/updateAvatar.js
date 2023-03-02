const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const Jimp = require("jimp");

const path = require("path");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { filename, path: tempUpload } = req.file;
  const avatarPath = path.resolve("public", "avatars", filename);
  const avatarURL = path.join("public", "avatars", filename);

  try {
    const avatar = await Jimp.read(tempUpload);
    await avatar.resize(250, 250).writeAsync(tempUpload);
    await fs.rename(tempUpload, avatarPath);
    const user = await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new Unauthorized("Not authorized.");
  }
};

module.exports = updateAvatar;
