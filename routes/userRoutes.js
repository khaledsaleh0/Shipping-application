import express from "express";
import {
  isUser,
  login,
  signup,
  validateLogin,
  validateSignup,
} from "../controllers/authController.js";
import { getAllUsers, getUser } from "../controllers/userController.js";
import { getMe } from "../middlwares/requestMiddlwares.js";
import { validateRequest } from "../utils/authUtils.js";

const router = express.Router();

//* ============================================================

// /api/users

// @route     POST /api/users/signup
// @desc      Signup user
// @access    Public
router.post("/signup", validateSignup, validateRequest, signup);

// @route     POST /api/users/login
// @desc      Login user
// @access    Public
router.post("/login", validateLogin, validateRequest, login);

// User must be authenticated. - (Middleware)
router.use(isUser);

// @route     GET /api/users/me
// @desc      Get My Data
// @access    Private
router.get("/me", getMe, getUser);

router
  .route("/")
  // @route     GET /api/users
  // @desc      Get All Users
  // @access    Private - Admin
  .get(getAllUsers);

router
  .route("/:id")
  // @route     GET /api/users/:userId
  // @desc      Get User
  // @access    Private
  .get(getUser);

//* =============================================

export default router;
