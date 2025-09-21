const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");

//swagger documentation route
router.use("/", require("./swagger"));

//Initial message at the root route
router.get("/", (req, res) => {
  //#Swagger.tags = ['Hello World']
  res.send("Hello, welcome to the API");
});

//get all animals
router.use("/animals", require("./animals"));

//get all ice cream flavors
router.use("/icecream", require("./icecream"));

module.exports = router;
