const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { favorite } = req.body;
  const data = await Contact.findOneAndUpdate({ _id: id, owner: userId }, { favorite }, { new: true });
  if (!data) {
    throw NotFound(`Contact with id=${id} was not found`);
  }
  res.status(200).json({ data });
};

module.exports = updateStatus;
