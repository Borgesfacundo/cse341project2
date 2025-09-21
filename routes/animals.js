const express = require("express");
const router = express.Router();

const useController = require("../controllers/animals");

router.get("/", useController.getAllAnimals);

router.get("/:id", useController.getAnimalById);

router.post("/", useController.createAnimal);

router.put("/:id", useController.updateAnimal);

router.delete("/:id", useController.deleteAnimal);

module.exports = router;
