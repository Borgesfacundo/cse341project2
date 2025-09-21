const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all ice cream flavors
const getAllFlavors = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// Get a specific ice cream flavor by ID
const getFlavorById = async (req, res) => {
  const flavorId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("icecream")
    .find({ _id: flavorId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = {
  getAllFlavors,
  getFlavorById,
};
