class ApiResponse {
  constructor({
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null,
    requestId = null,
  } = {}) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.requestId = requestId;
  }
}

export default ApiResponse;