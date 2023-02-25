const express = require("express");
const { ctrlContacts } = require("../../controllers");
const { auth } = require("../../middlewares");

const { validationBody, validationParams } = require("../../middlewares/");
const { joiSchemaBody, joiSchemaParams, joiSchemaStatus } = require("../../models/");

const router = express.Router();

router.get("/", auth, ctrlContacts.getAll);

router.get("/:id", auth, validationParams(joiSchemaParams), ctrlContacts.getById);

router.post("/", auth, validationBody(joiSchemaBody), ctrlContacts.add);

router.delete("/:id", auth, validationParams(joiSchemaParams), ctrlContacts.removeById);

router.put("/:id", auth, validationParams(joiSchemaParams), validationBody(joiSchemaBody), ctrlContacts.update);

router.patch(
  "/:id/favorite",
  validationParams(joiSchemaParams),
  validationBody(joiSchemaStatus),
  ctrlContacts.updateStatus
);

module.exports = router;
