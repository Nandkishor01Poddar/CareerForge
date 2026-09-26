import AppError from "../core/errors/AppError.js";

const notFoundMiddleware = (req, res, next) => {
  next(
    new AppError({
      statusCode: 404,
      code: "ROUTE_NOT_FOUND",
      message: `Route ${req.method} ${req.originalUrl} not found`,
    })
  );
};

export default notFoundMiddleware;