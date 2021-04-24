// This class is created to handle all Operational error that is expected to happen.

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Error Class expects a message.

    this.message = Array.isArray(message) ? message : [{ msg: message }];
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
