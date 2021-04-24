import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import AppError from "./../utils/appError.js";
import catchAsync from "./catchAsync.js";
//*============================================

//! generate and return token
export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//! validate request with Express-validator - Middleware
export const validateRequest = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array(), 400));
  }
  next();
});

//! Validate allowed fields on any document update
export const isValidUpdate = (reqBody, allowedFields = []) => {
  const updates = Object.keys(reqBody);
  const isValidOperation = updates.every((update) =>
    allowedFields.includes(update)
  );
  return isValidOperation;
};
