const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const { asyncHandler } = require("../middleware/simpleErrorHandler");

// Get all animals
const getAllAnimals = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Animals']
  // #swagger.description = 'Get all animals from the database'
  const result = await mongodb
    .getDb()
    .db("animals")
    .collection("animals")
    .find();

  const animals = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(animals);
});

// Get a specific animal by ID
const getAnimalById = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Animals']
  // #swagger.description = 'Get a specific animal by ID'
  const animalId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("animals")
    .collection("animals")
    .findOne({ _id: animalId });

  if (!result) {
    return res.status(404).json({
      error: "Animal not found",
      message: "No animal found with the provided ID",
    });
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
});

// Create a new animal
const createAnimal = asyncHandler(async (req, res) => {
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
    res.status(201).json({
      success: true,
      message: "Animal created successfully",
      id: response.insertedId,
    });
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the animal.");
  }
});

// Update an animal by ID
const updateAnimal = asyncHandler(async (req, res) => {
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
    res.status(200).json({
      success: true,
      message: "Animal updated successfully",
    });
  } else if (response.matchedCount === 0) {
    res.status(404).json({
      error: "Animal not found",
      message: "No animal found with the provided ID",
    });
  } else {
    res.status(500).json({
      error: "Update failed",
      message: "Some error occurred while updating the animal.",
    });
  }
});

// Delete an animal by ID
const deleteAnimal = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Animals']
  // #swagger.description = 'Delete an animal by ID'
  const animalId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db("animals")
    .collection("animals")
    .deleteOne({ _id: animalId });

  if (response.deletedCount > 0) {
    res.status(200).json({
      success: true,
      message: "Animal deleted successfully",
    });
  } else {
    res.status(404).json({
      error: "Animal not found",
      message: "No animal found with the provided ID",
    });
  }
});

module.exports = {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};
