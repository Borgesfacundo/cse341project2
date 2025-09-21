const express = require("express");
const router = express.Router();

const useController = require("../controllers/icecream");

router.get("/", useController.getAllFlavors);

router.get("/:id", useController.getFlavorById);

router.post("/", useController.createFlavor);

router.put("/:id", useController.updateFlavor);

router.delete("/:id", useController.deleteFlavor);

module.exports = router;
