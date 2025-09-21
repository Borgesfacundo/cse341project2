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

// Create a new animal
const createAnimal = async (req, res) => {
  const animal = {
    name: req.body.name,
    species: req.body.species,
    lifespan: req.body.lifespan,
    continent: req.body.continent,
    description: req.body.description,
  };

  const response = await mongodb
    .getDb()
    .db("animals")
    .collection("animals")
    .insertOne(animal);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the animal.");
  }
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  createAnimal,
};
