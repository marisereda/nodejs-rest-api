const { Contact } = require("../../models");

const add = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json({ data });
};

module.exports = add;
