const { ctrlWrap } = require("../../helpers");
const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyUserEmail = require("./verifyUserEmail");

module.exports = {
  login: ctrlWrap(login),
  signup: ctrlWrap(signup),
  getCurrent: ctrlWrap(getCurrent),
  logout: ctrlWrap(logout),
  updateSubscription: ctrlWrap(updateSubscription),
  updateAvatar: ctrlWrap(updateAvatar),
  verifyUserEmail: ctrlWrap(verifyUserEmail),
};
