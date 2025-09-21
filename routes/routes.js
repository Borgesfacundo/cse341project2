const express = require("express");
const router = express.Router();
const mongodb = require("../db/connect");

const getData = async (req, res) => {
  const result = await mongodb.getDb().db().collection("data").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

router.get("/", getData);

module.exports = router;
