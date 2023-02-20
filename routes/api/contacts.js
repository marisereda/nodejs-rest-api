const express = require("express");
const controllers = require("../../controllers/contacts");
const cntrlWrap = require("../../helpers/cntrlWrap");
const validation = require("../../middlewares/validation");
const { contactSchema } = require("../../schemas/contacts");
const router = express.Router();

router.get("/", cntrlWrap(controllers.getContacts));

router.get("/:id", cntrlWrap(controllers.getContactById));

router.post("/", validation(contactSchema), cntrlWrap(controllers.addContact));

router.delete("/:id", cntrlWrap(controllers.deleteContact));

router.put("/:id", validation(contactSchema), cntrlWrap(controllers.updateContact));

module.exports = router;
