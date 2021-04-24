import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addCategory,
  deleteCategoryByID,
  getAllCategories,
  getCategoryByID,
  // updateCategoryByID,
  validateCategory,
} from "../controllers/categoryController.js";
import { validateRequest } from "../utils/authUtils.js";

const router = express.Router();
//* ============================================================

// /api/categories

router.use(isUser);

router
  .route("/")
  // @route     GET /api/categories
  // @desc      Get All Categories
  // @access    Private
  .get(getAllCategories)

  // @route     POST /api/categories
  // @desc      Add New Category
  // @access    Private
  .post(validateCategory, validateRequest, addCategory);

router
  .route("/:id")
  // @route     GET /api/categories/:id
  // @desc      Get Category by ID
  // @access    Private
  .get(getCategoryByID)
  // @route     PATCH /api/categories/:id
  // @desc      Update Category by ID
  // @access    Private
  // .patch(validateCategory, validateRequest, updateCategoryByID)
  // @route     DELETE /api/categories/:id
  // @desc      Delete Category by ID
  // @access    Private
  .delete(deleteCategoryByID);

//* =============================================

export default router;
