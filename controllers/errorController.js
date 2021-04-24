// Central Global Error Handling
import mongoose from "mongoose";
import AppError from "../utils/appError.js";
//* ============================================================

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value || `No ${err.path} Provided`}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const duplicateField = Object.keys(err.keyValue)[0];
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `This ${duplicateField}:${value} Already Exists. Please use another ${duplicateField}!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again!", 401);

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: Array.isArray(err.message) ? err.message : [{ msg: err.message }],
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  //! A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //! B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR", err);

  // 2) send generic message
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong",
  });
};

export default function (err, req, res, next) {
  err.statusCode = err.statusCode || 500; // 500 internal server error.
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    //! set the error to be operational by producing our own custom error handler.
    // Invalid Database ID
    // if (error.name === "CastError") error = handleCastErrorDB(error);
    if (err instanceof mongoose.Error.CastError) error = handleCastErrorDB(error);

    // Duplicate Database Fields
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    // Mongoose Validation Error
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);

    // JWT Invalid Token Error
    if (error.name === "JsonWebTokenError") error = handleJWTError();

    // JWT Expired Token Error
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
}
