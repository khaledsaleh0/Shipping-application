import _isEmpty from "lodash/isEmpty.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
//* ==========================================================

export const isEmptyBody = catchAsync(async (req, res, next) => {
  if (_isEmpty(req.body)) {
    return next(new AppError("Invalid Operation: No data provided", 400));
  }
  next();
});

//! Middlware to Get Current User's Data
export const getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
