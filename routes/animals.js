const express = require("express");
const router = express.Router();

const useController = require("../controllers/animals");
const {
  validateAnimal,
  validateObjectId,
  validateAnimalUpdate,
} = require("../helpers/validator");

router.get("/", useController.getAllAnimals);

router.get("/:id", validateObjectId, useController.getAnimalById);

router.post("/", validateAnimal, useController.createAnimal);

router.put(
  "/:id",
  validateObjectId,
  validateAnimalUpdate,
  useController.updateAnimal
);

router.delete("/:id", validateObjectId, useController.deleteAnimal);

module.exports = router;
