const express = require("express");
const router = express.Router();

const useController = require("../controllers/icecream");

const { isAuthenticated } = require("../middleware/simpleErrorHandler");

const {
  validateIceCream,
  validateObjectId,
  validateIceCreamUpdate,
} = require("../helpers/validator");

router.get("/", useController.getAllFlavors);

router.get("/:id", validateObjectId, useController.getFlavorById);

router.post("/", isAuthenticated, validateIceCream, useController.createFlavor);

router.put(
  "/:id",
  isAuthenticated,
  validateObjectId,
  validateIceCreamUpdate,
  useController.updateFlavor
);

router.delete(
  "/:id",
  isAuthenticated,
  validateObjectId,
  useController.deleteFlavor
);

module.exports = router;
