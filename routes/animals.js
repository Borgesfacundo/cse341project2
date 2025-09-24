const express = require("express");
const router = express.Router();

const useController = require("../controllers/animals");

const { isAuthenticated } = require("../middleware/simpleErrorHandler");

const {
  validateAnimal,
  validateObjectId,
  validateAnimalUpdate,
} = require("../helpers/validator");

router.get("/", useController.getAllAnimals);

router.get("/:id", validateObjectId, useController.getAnimalById);

router.post("/", isAuthenticated, validateAnimal, useController.createAnimal);

router.put(
  "/:id",
  isAuthenticated,
  validateObjectId,
  validateAnimalUpdate,
  useController.updateAnimal
);

router.delete(
  "/:id",
  isAuthenticated,
  validateObjectId,
  useController.deleteAnimal
);

module.exports = router;
