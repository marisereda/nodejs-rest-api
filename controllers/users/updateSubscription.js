const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const updatedUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
  res.status(200).json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = updateSubscription;
