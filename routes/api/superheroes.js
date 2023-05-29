const express = require("express");


const { superhero: ctrl } = require("../../controllers");

const router = express.Router();

const { upload, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../model/superheroes");



router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post(
  "/",

  upload.array("images"),

  ctrlWrapper(ctrl.addSuperhero)
);

router.delete("/:id", ctrlWrapper(ctrl.deleteSuperhero));

router.put(
  "/:id",
  upload.array("images"),
  validation(joiSchema),
  ctrlWrapper(ctrl.updateSuperhero)
);


router.post(
  "/:id/avatars",
  upload.array("images"),
  ctrlWrapper(ctrl.addAvatar)
);
router.delete("/:id/avatars/:imageId", ctrlWrapper(ctrl.removeAvatar));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
module.exports = router;
