const { Contact } = require("../../models");

const add = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await Contact.create({ ...req.body, owner: userId });
  res.status(201).json({ data });
};

module.exports = add;
