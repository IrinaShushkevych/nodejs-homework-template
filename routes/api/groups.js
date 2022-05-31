const express = require("express");
const { ctrlWrapper, validate, auth } = require("../../middlewares");
const { groupSchema } = require("../../models");
const { groupsCtrl: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getGroups));

router.post(
  "/",
  auth,
  validate(groupSchema.joiGroup),
  ctrlWrapper(ctrl.addGroup)
);

router.patch(
  "/:groupId",
  auth,
  validate(groupSchema.joiUpdateGroup),
  ctrlWrapper(ctrl.updateGroup)
);

router.delete("/:groupId", auth, ctrlWrapper(ctrl.removeGroup));

module.exports = router;
