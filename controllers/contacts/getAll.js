const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite ? { owner: _id, favorite } : { owner: _id };
  const data = await Contact.find(filter, { owner: false }, { skip, limit: Number(limit) });
  res.status(200).json({ data });
};

module.exports = getAll;
