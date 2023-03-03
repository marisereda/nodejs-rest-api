const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const Jimp = require("jimp");

const path = require("path");
const fs = require("fs/promises");
const { existsSync } = require("fs");

const updateAvatar = async (req, res) => {
  const { _id: userId, avatarURL: oldAvatarURL } = req.user;
  const { filename, path: tempAvatarPath } = req.file;
  const avatarPath = path.resolve("public", "avatars", filename);
  const avatarURL = path.join("public", "avatars", filename);

  try {
    const avatar = await Jimp.read(tempAvatarPath);
    await avatar.resize(250, 250).writeAsync(tempAvatarPath);
    await fs.rename(tempAvatarPath, avatarPath);
    if (existsSync(oldAvatarURL)) {
      await fs.unlink(oldAvatarURL);
    }
    const user = await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
    res.status(200).json({ avatar: user.avatarURL });
  } catch (error) {
    await fs.unlink(tempAvatarPath);
    throw new Unauthorized("Not authorized.");
  }
};

module.exports = updateAvatar;
