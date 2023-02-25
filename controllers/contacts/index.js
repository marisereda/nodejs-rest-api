const { ctrlWrap } = require("../../helpers");
const getAll = require("./getAll");
const add = require("./add");
const getById = require("./getById");
const removeById = require("./removeById");
const update = require("./update");
const updateStatus = require("./updateStatus");

module.exports = {
  getAll: ctrlWrap(getAll),
  add: ctrlWrap(add),
  getById: ctrlWrap(getById),
  removeById: ctrlWrap(removeById),
  update: ctrlWrap(update),
  updateStatus: ctrlWrap(updateStatus),
};
