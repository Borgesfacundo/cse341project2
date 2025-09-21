const express = require("express");
const router = express.Router();
const mongodb = require("../db/connect");

const getData = async (req, res) => {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

router.get("/", (req, res) => {
  res.send("Hello, welcome to the API");
});

router.get("/contacts", getData);

module.exports = router;
