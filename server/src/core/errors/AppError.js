class AppError extends Error {
  constructor({
    message,
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR",
    errors = [],
    isOperational = true,
    cause = null,
  }) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
    this.isOperational = isOperational;
    this.cause = cause;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;