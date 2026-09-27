import AppError from "./AppError.js";

const normalizeError = (error) => {
  if (error instanceof AppError) {
    return error;
  }

  // Mongoose validation
  if (error.name === "ValidationError") {
    return new AppError({
      statusCode: 400,
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      errors: Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      })),
      cause: error,
    });
  }

  // MongoDB duplicate key
  if (error.code === 11000) {
    return new AppError({
      statusCode: 409,
      code: "RESOURCE_ALREADY_EXISTS",
      message: "A resource with this value already exists",
      errors: [],
      cause: error,
    });
  }

  // JWT
  if (error.name === "TokenExpiredError") {
    return new AppError({
      statusCode: 401,
      code: "TOKEN_EXPIRED",
      message: "Authentication token has expired",
      cause: error,
    });
  }

  if (error.name === "JsonWebTokenError") {
    return new AppError({
      statusCode: 401,
      code: "TOKEN_INVALID",
      message: "Invalid authentication token",
      cause: error,
    });
  }

  // Unknown error
  return new AppError({
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
    isOperational: false,
    cause: error,
  });
};

export default normalizeError;