import ApiResponse from "./ApiResponse.js";

export const sendResponse = (
  res,
  {
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null,
  } = {}
) => {
  return res.status(statusCode).json(
    new ApiResponse({
      statusCode,
      message,
      data,
      meta,
      requestId: res.locals.requestId || null,
    })
  );
};