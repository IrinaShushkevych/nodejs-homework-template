// created by Irina Shushkevych
const express = require("express");

const {
  ctrlWrapper,
  validate,
  auth,
  uploadAvatar,
} = require("../../middlewares");
const { authCtrl: ctrl } = require("../../controllers");
const { userSchema: schema } = require("../../models");

const router = express.Router();

router.post("/verify", ctrlWrapper(ctrl.reVerification));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/signup",
  validate(schema.joiRegisterUser),
  ctrlWrapper(ctrl.register)
);

router.post("/signin", validate(schema.joiLoginUser), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  [auth, uploadAvatar.single("avatar")],
  ctrlWrapper(ctrl.updateAvatars)
);

router.patch(
  "/:id",
  auth,
  validate(schema.joiUpdateSubscription),
  ctrlWrapper(ctrl.updateUser)
);

module.exports = router;
