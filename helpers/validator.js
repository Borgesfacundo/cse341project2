const { body, param, validationResult } = require("express-validator");

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array(),
    });
  }
  next();
};

// ====================================
// 🐾 ANIMALS VALIDATIONS
// ====================================

// Validation rules for creating/updating animals
const validateAnimal = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("species")
    .trim()
    .notEmpty()
    .withMessage("Species is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Species must be between 3 and 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Species can only contain letters and spaces"),

  body("lifespan")
    .trim()
    .notEmpty()
    .withMessage("Lifespan is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Lifespan must be between 3 and 50 characters")
    .matches(/^[\d\-\s\w]+$/)
    .withMessage('Lifespan format is invalid (e.g., "10-15 years")'),

  body("continent")
    .trim()
    .notEmpty()
    .withMessage("Continent is required")
    .isIn([
      "Africa",
      "Asia",
      "Europe",
      "North America",
      "South America",
      "Australia",
      "Antarctica",
      "Arctic",
      "World",
    ])
    .withMessage("Continent must be a valid continent name"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  handleValidationErrors,
];

// ====================================
// 🍦 ICE CREAM VALIDATIONS
// ====================================

// Validation rules for creating/updating ice cream
const validateIceCream = [
  body("flavor")
    .trim()
    .notEmpty()
    .withMessage("Flavor is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Flavor must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s&]+$/)
    .withMessage("Flavor can only contain letters, spaces, and &"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0.01, max: 999.99 })
    .withMessage("Price must be a number between 0.01 and 999.99")
    .toFloat(),

  body("calories")
    .notEmpty()
    .withMessage("Calories is required")
    .isInt({ min: 1, max: 2000 })
    .withMessage("Calories must be an integer between 1 and 2000")
    .toInt(),

  body("isVegan")
    .notEmpty()
    .withMessage("isVegan field is required")
    .isBoolean()
    .withMessage("isVegan must be true or false")
    .toBoolean(),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 0.0, max: 5.0 })
    .withMessage("Rating must be a number between 0.0 and 5.0")
    .toFloat(),

  handleValidationErrors,
];

// ====================================
// 📋 ID VALIDATIONS
// ====================================

// Validation for MongoDB ObjectId
const validateObjectId = [
  param("id")
    .isMongoId()
    .withMessage("Invalid ID format. Must be a valid MongoDB ObjectId"),

  handleValidationErrors,
];

// ====================================
// 🧪 CUSTOM VALIDATIONS
// ====================================

// Custom validation for animal update (all fields optional but must be valid if provided)
const validateAnimalUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("species")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Species must be between 3 and 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Species can only contain letters and spaces"),

  body("lifespan")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Lifespan must be between 3 and 50 characters")
    .matches(/^[\d\-\s\w]+$/)
    .withMessage("Lifespan format is invalid"),

  body("continent")
    .optional()
    .trim()
    .isIn([
      "Africa",
      "Asia",
      "Europe",
      "North America",
      "South America",
      "Australia",
      "Antarctica",
      "Arctic",
    ])
    .withMessage("Continent must be a valid continent name"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  handleValidationErrors,
];

// Custom validation for ice cream update (all fields optional but must be valid if provided)
const validateIceCreamUpdate = [
  body("flavor")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Flavor must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s&]+$/)
    .withMessage("Flavor can only contain letters, spaces, and &"),

  body("price")
    .optional()
    .isFloat({ min: 0.01, max: 999.99 })
    .withMessage("Price must be a number between 0.01 and 999.99")
    .toFloat(),

  body("calories")
    .optional()
    .isInt({ min: 1, max: 2000 })
    .withMessage("Calories must be an integer between 1 and 2000")
    .toInt(),

  body("isVegan")
    .optional()
    .isBoolean()
    .withMessage("isVegan must be true or false")
    .toBoolean(),

  body("rating")
    .optional()
    .isFloat({ min: 0.0, max: 5.0 })
    .withMessage("Rating must be a number between 0.0 and 5.0")
    .toFloat(),

  handleValidationErrors,
];

module.exports = {
  validateAnimal,
  validateIceCream,
  validateObjectId,
  validateAnimalUpdate,
  validateIceCreamUpdate,
  handleValidationErrors,
};
