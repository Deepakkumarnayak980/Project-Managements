class ApiResponse {
  constructor(
    statusCode,
    data = null,
    message = "Success"
  ) {
    this.statusCode = statusCode; // HTTP status
    this.data = data;             // Response data
    this.message = message;       // Message
    this.success = statusCode < 400; // true if success
  }
}

export { ApiResponse };