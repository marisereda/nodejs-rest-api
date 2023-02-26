const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await Contact.findOneAndRemove({ _id: id, owner: userId });
  if (!data) {
    throw NotFound(`Contact with id=${id} was not found`);
  }
  res.status(200).json({ data });
};

module.exports = removeById;
