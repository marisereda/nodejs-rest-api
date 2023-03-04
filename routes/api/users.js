const express = require("express");
const { validationBody, auth, upload } = require("../../middlewares");
const { ctrlUsers } = require("../../controllers");
const { joiSchemaLogin, joiSchemaSubscription } = require("../../models");
const router = express.Router();

router.get("/current", auth, ctrlUsers.getCurrent);
router.post("/signup", validationBody(joiSchemaLogin), ctrlUsers.signup);
router.post("/login", validationBody(joiSchemaLogin), ctrlUsers.login);
router.get("/logout", auth, ctrlUsers.logout);
router.patch("/", auth, validationBody(joiSchemaSubscription), ctrlUsers.updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), ctrlUsers.updateAvatar);
router.get("/verify/:verificationToken", ctrlUsers.verifyUserEmail);

module.exports = router;
