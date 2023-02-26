const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, limit = 20, favorite, name, email } = req.query;

  const filter = { owner: userId };
  if (favorite) {
    filter.favorite = favorite;
  }
  if (name) {
    filter.name = new RegExp(name, "i");
  }
  if (email) {
    filter.email = new RegExp(email, "i");
  }
  const skip = (page - 1) * limit;

  const data = await Contact.find(filter, "", { skip, limit: Number(limit) });
  res.status(200).json({ data });
};

module.exports = getAll;
