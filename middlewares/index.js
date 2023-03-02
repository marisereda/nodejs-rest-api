const { validationBody, validationParams, validationQuery } = require("./validation");
const auth = require("./auth");
const upload = require("./upload");

module.exports = { validationBody, validationParams, validationQuery, auth, upload };
