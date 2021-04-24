import passport from "passport";
import { check } from "express-validator";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";
import User from "./../models/userModel.js";
import { signToken } from "../utils/authUtils.js";

//*============================================

//! UTILS.
//! send user's data
const sendUserData = (user, statusCode, message, res, token = undefined) => {
  //! DON'T expose salt & hash
  user.salt = undefined;
  user.hash = undefined;
  return res.status(statusCode).json({
    status: "success",
    message,
    data: { user, token: token && token },
  });
};

//* ==========================================================
//* ==========================================================

//! user SIGNUP
export const validateSignup = [
  check("username", "User Name is required.").trim().exists().notEmpty(),
  check("email", "Email is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage("Please include a valid Email."),
  check("password", "Password is required.").trim().exists().notEmpty(),
];
export const signup = catchAsync(async (req, res, next) => {
  const { email, username, password } = req.body;
  const newUser = new User({ email, username });

  User.register(newUser, password, async (err, user) => {
    if (err) return next(new AppError(err.message, 400));

    sendUserData(user, 201, "Your account has been created successfully!", res);
  });
});

// ==========================================================
//! user LOGIN
export const validateLogin = [
  check("email", "Email is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage("Please include a valid Email."),
  check("password", "Password is required.").trim().exists().notEmpty(),
];

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const authenticate = User.authenticate();
  const { user, error } = await authenticate(email, password);

  if (error) return next(new AppError(error.message, 404));
  if (!user) return next(new AppError("User not exists!", 404));

  const token = signToken(user._id);
  sendUserData(user, 200, "You are successfully logged in!", res, token);
});

// ==========================================================

//! Authenticate isUser - (Middlware)
export const isUser = catchAsync(async (req, res, next) =>
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    (err, user, info) => {
      if (err) return next(new AppError(err, 404));
      if (!user) return next(new AppError("You are Not Authenticated!", 401));
      // append user to request for further use
      req.user = user;
      next();
    }
  )(req, res, next)
);
