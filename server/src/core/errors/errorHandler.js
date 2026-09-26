import normalizeError from "./errorNormalizer.js";

const errorHandler = (error, req, res, next) => {
  const normalizedError = normalizeError(error);

  const {
    statusCode,
    code,
    message,
    errors,
    isOperational,
  } = normalizedError;

  // Log the original error
  if (!isOperational) {
    console.error(error);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    code,
    message,
    errors,
    requestId: res.locals.requestId || null,

    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};

export default errorHandler;