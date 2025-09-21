const express = require("express");
const router = express.Router();

const useController = require("../controllers/icecream");
const {
  validateIceCream,
  validateObjectId,
  validateIceCreamUpdate,
} = require("../helpers/validator");

router.get("/", useController.getAllFlavors);

router.get("/:id", validateObjectId, useController.getFlavorById);

router.post("/", validateIceCream, useController.createFlavor);

router.put(
  "/:id",
  validateObjectId,
  validateIceCreamUpdate,
  useController.updateFlavor
);

router.delete("/:id", validateObjectId, useController.deleteFlavor);

module.exports = router;
