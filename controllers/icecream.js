const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const { asyncHandler } = require("../middleware/simpleErrorHandler");

// Get all ice cream flavors
const getAllFlavors = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Get all ice cream flavors from the database'
  const result = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .find();

  const flavors = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(flavors);
});

// Get a specific ice cream flavor by ID
const getFlavorById = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Get a specific ice cream flavor by ID'
  const flavorId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .findOne({ _id: flavorId });

  if (!result) {
    return res.status(404).json({
      error: "Ice cream flavor not found",
      message: "No ice cream flavor found with the provided ID",
    });
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
});

// Create a new ice cream flavor
const createFlavor = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Create a new ice cream flavor'
  const icecream = {
    flavor: req.body.flavor,
    price: req.body.price,
    calories: req.body.calories,
    isVegan: req.body.isVegan,
    rating: req.body.rating,
    ingredients: req.body.ingredients,
    availableSize: req.body.availableSize,
  };

  const response = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .insertOne(icecream);

  if (response.acknowledged) {
    res.status(201).json({
      success: true,
      message: "Ice cream flavor created successfully",
      id: response.insertedId,
    });
  } else {
    res.status(500).json({
      error: "Creation failed",
      message: "Some error occurred while creating the ice cream flavor.",
    });
  }
});

// Update an ice cream flavor by ID
const updateFlavor = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Update an existing ice cream flavor by ID'
  const flavorId = new ObjectId(req.params.id);
  const icecream = {
    flavor: req.body.flavor,
    price: req.body.price,
    calories: req.body.calories,
    isVegan: req.body.isVegan,
    rating: req.body.rating,
    ingredients: req.body.ingredients,
    availableSize: req.body.availableSize,
  };

  const response = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .updateOne({ _id: flavorId }, { $set: icecream });

  if (response.modifiedCount > 0) {
    res.status(200).json({
      success: true,
      message: "Ice cream flavor updated successfully",
    });
  } else if (response.matchedCount === 0) {
    res.status(404).json({
      error: "Ice cream flavor not found",
      message: "No ice cream flavor found with the provided ID",
    });
  } else {
    res.status(500).json({
      error: "Update failed",
      message: "Some error occurred while updating the ice cream flavor.",
    });
  }
});

// Delete an ice cream flavor by ID
const deleteFlavor = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Ice Cream']
  // #swagger.description = 'Delete an ice cream flavor by ID'
  const flavorId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db("icecream")
    .collection("icecream")
    .deleteOne({ _id: flavorId });

  if (response.deletedCount > 0) {
    res.status(200).json({
      success: true,
      message: "Ice cream flavor deleted successfully",
    });
  } else {
    res.status(404).json({
      error: "Ice cream flavor not found",
      message: "No ice cream flavor found with the provided ID",
    });
  }
});

module.exports = {
  getAllFlavors,
  getFlavorById,
  createFlavor,
  updateFlavor,
  deleteFlavor,
};
