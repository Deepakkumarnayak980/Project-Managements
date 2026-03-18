class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);

    this.name = "ApiError";        // Identify error type
    this.statusCode = statusCode;  // HTTP status code
    this.data = null;              // Optional response data
    this.success = false;          // Always false for errors
    this.errors = errors;          // Extra error details
    this.isOperational = true;     // Useful for production handling

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };