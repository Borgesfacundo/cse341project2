const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all ice cream flavors
const getAllFlavors = async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Get all ice cream flavors from the database'
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
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Get a specific ice cream flavor by ID'
  const flavorId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .find({ _id: flavorId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// Create a new ice cream flavor
const createFlavor = async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Create a new ice cream flavor'
  const icecream = {
    flavor: req.body.flavor,
    price: req.body.price,
    calories: req.body.calories,
    isVegan: req.body.isVegan,
    rating: req.body.rating,
  };

  const response = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .insertOne(icecream);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while creating the ice cream flavor."
      );
  }
};

// Update an ice cream flavor by ID
const updateFlavor = async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Update an existing ice cream flavor by ID'
  const flavorId = new ObjectId(req.params.id);
  const icecream = {
    flavor: req.body.flavor,
    price: req.body.price,
    calories: req.body.calories,
    isVegan: req.body.isVegan,
    rating: req.body.rating,
  };

  const response = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .updateOne({ _id: flavorId }, { $set: icecream });

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while updating the ice cream flavor."
      );
  }
};

// Delete an ice cream flavor by ID
const deleteFlavor = async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Delete an ice cream flavor by ID'
  const flavorId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .deleteOne({ _id: flavorId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while deleting the ice cream flavor."
      );
  }
};

module.exports = {
  getAllFlavors,
  getFlavorById,
  createFlavor,
  updateFlavor,
  deleteFlavor,
};
