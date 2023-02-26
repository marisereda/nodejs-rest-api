const express = require("express");
const { ctrlContacts } = require("../../controllers");
const { auth } = require("../../middlewares");

const { validationBody, validationParams, validationQuery } = require("../../middlewares/");
const {
  joiSchemaAddContact,
  joiSchemaAddContactId,
  joiSchemaUpdateContact,
  joiSchemaStatus,
  joiSchemaFilter,
} = require("../../models/");

const router = express.Router();

router.get("/", auth, validationQuery(joiSchemaFilter), ctrlContacts.getAll);

router.get("/:id", auth, validationParams(joiSchemaAddContactId), ctrlContacts.getById);

router.post("/", auth, validationBody(joiSchemaAddContact), ctrlContacts.add);

router.delete("/:id", auth, validationParams(joiSchemaAddContactId), ctrlContacts.removeById);

router.put(
  "/:id",
  auth,
  validationParams(joiSchemaAddContactId),
  validationBody(joiSchemaUpdateContact),
  ctrlContacts.update
);

router.patch(
  "/:id/favorite",
  validationParams(joiSchemaAddContactId),
  validationBody(joiSchemaStatus),
  ctrlContacts.updateStatus
);

module.exports = router;
