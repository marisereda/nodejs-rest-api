const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await Contact.findOne({ _id: id, owner: userId });
  if (!data) {
    throw NotFound(`Contact with id=${id} was not found`);
  }
  res.status(200).json({ data });
};

module.exports = getById;
