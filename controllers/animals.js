const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all animals
const getAllAnimals = async (req, res) => {
  // #swagger.tags = ['Animals']
  // #swagger.description = 'Get all animals from the database'
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
  // #swagger.tags = ['Animals']
  // #swagger.description = 'Get a specific animal by ID'
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
  // #swagger.tags = ['Animals']
  // #swagger.description = 'Create a new animal'
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

// Update an animal by ID
const updateAnimal = async (req, res) => {
  // #swagger.tags = ['Animals']
  // #swagger.description = 'Update an existing animal by ID'
  const animalId = new ObjectId(req.params.id);
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
    .updateOne({ _id: animalId }, { $set: animal });

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the animal.");
  }
};

// Delete an animal by ID
const deleteAnimal = async (req, res) => {
  // #swagger.tags = ['Animals']
  // #swagger.description = 'Delete an animal by ID'
  const animalId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db("animals")
    .collection("animals")
    .deleteOne({ _id: animalId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the animal.");
  }
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};
