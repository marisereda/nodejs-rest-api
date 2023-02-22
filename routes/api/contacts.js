const express = require("express");
const controllers = require("../../controllers");

const { validationBody, validationParams } = require("../../middlewares/");
const { joiSchemaBody, joiSchemaParams, joiSchemaStatus } = require("../../models/");
const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:id", validationParams(joiSchemaParams), controllers.getById);

router.post("/", validationBody(joiSchemaBody), controllers.add);

router.delete("/:id", validationParams(joiSchemaParams), controllers.removeById);

router.put("/:id", validationParams(joiSchemaParams), validationBody(joiSchemaBody), controllers.update);

router.patch(
  "/:id/favorite",
  validationParams(joiSchemaParams),
  validationBody(joiSchemaStatus),
  controllers.updateStatus
);

module.exports = router;
