const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  // Mongoose invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack
    })
  });
};

module.exports = errorHandler;