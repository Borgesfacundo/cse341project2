// ====================================
// 🚨 Middleware file
// ====================================

// error handler for routes
const globalErrorHandler = (err, req, res, next) => {
  // error log for debugging
  console.error("Error occurred:", err.message);

  // mongodb invalid id error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      error: "Invalid ID format",
      message: "The provided ID is not a valid MongoDB ObjectId",
    });
  }

  // internal server error for any other errors
  res.status(500).json({
    error: "Internal server error",
    message: "Something went wrong on our end",
  });
};

// Middleware for handling not found routes (404)
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

// middleware to wrap async functions and catch errors
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json("You do not have access to this resource");
  }
  next();
};

module.exports = {
  globalErrorHandler,
  notFoundHandler,
  asyncHandler,
  isAuthenticated,
};
