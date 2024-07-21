class ErrorRespone extends Error {
  constructor(message, statusCode, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }

  static createErrorResponse(err) {
    let customError = { ...err };
    customError.message = err.message;

    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      customError = new ErrorRespone(message, 404);
    }

    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      customError = new ErrorRespone(message, 400);
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      customError = new ErrorRespone(message, 400);
    }

    return customError;
  }
}

export default ErrorRespone;
