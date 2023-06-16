const {
  Contact,
  joiSchemaAddContact,
  joiSchemaAddContactId,
  joiSchemaUpdateContact,
  joiSchemaStatus,
  joiSchemaFilter,
} = require('./contact');
const {
  User,
  joiSchemaLogin,
  joiSchemaSubscription,
  joiSchemaVerify,
  joiSchemaSignUp,
} = require('./user');

module.exports = {
  Contact,
  joiSchemaAddContact,
  joiSchemaAddContactId,
  joiSchemaUpdateContact,
  joiSchemaStatus,
  joiSchemaFilter,
  User,
  joiSchemaLogin,
  joiSchemaSubscription,
  joiSchemaVerify,
  joiSchemaSignUp,
};
