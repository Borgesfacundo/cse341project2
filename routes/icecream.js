const express = require("express");
const router = express.Router();

const useController = require("../controllers/icecream");

router.get("/", useController.getAllFlavors);

router.get("/:id", useController.getFlavorById);

module.exports = router;
