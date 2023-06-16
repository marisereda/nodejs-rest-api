const express = require('express');
const { validationBody, auth, upload } = require('../../middlewares');
const { ctrlUsers } = require('../../controllers');
const {
  joiSchemaLogin,
  joiSchemaSubscription,
  joiSchemaVerify,
  joiSchemaSignUp,
} = require('../../models');
const router = express.Router();

router.get('/current', auth, ctrlUsers.getCurrent);
router.post('/signup', validationBody(joiSchemaSignUp), ctrlUsers.signup);
router.post('/login', validationBody(joiSchemaLogin), ctrlUsers.login);
router.get('/logout', auth, ctrlUsers.logout);
router.patch(
  '/',
  auth,
  validationBody(joiSchemaSubscription),
  ctrlUsers.updateSubscription
);
router.patch('/avatars', auth, upload.single('avatar'), ctrlUsers.updateAvatar);
router.get('/verify/:verificationToken', ctrlUsers.verifyUserEmail);
router.post(
  '/verify',
  validationBody(joiSchemaVerify),
  ctrlUsers.checkEmailVerification
);

module.exports = router;
