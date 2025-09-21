const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");

const getData = async (req, res) => {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

//Initial message at the root route
router.get("/", (req, res) => {
  res.send("Hello, welcome to the API");
});

//get all animals
router.use("/animals", require("./animals"));

//get all ice cream flavors
router.use("/icecream", require("./icecream"));

module.exports = router;
