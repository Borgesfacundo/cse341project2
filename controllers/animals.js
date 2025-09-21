const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all animals
const getAllAnimals = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("animals")
    .collection("animals")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// Get a specific animal by ID
const getAnimalById = async (req, res) => {
  const animalId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("animals")
    .collection("animals")
    .find({ _id: animalId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = {
  getAllAnimals,
  getAnimalById,
};
