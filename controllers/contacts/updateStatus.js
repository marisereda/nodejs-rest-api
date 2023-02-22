const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const data = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
  if (!data) {
    throw NotFound(`Contact with id=${id} was not found`);
  }
  res.status(200).json({ data });
};

module.exports = updateStatus;
