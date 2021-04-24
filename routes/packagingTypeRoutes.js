import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addPackagingTypes,
  deletePackagingTypeByID,
  getAllPackagingTypes,
  getPackagingTypeByID,
  updatePackagingTypeByID,
  validatePackagingType,
} from "../controllers/packagingTypeController.js";
import { validateRequest } from "../utils/authUtils.js";

const router = express.Router();

//* ============================================================

// /api/packagingTypes

router.use(isUser);

router
  .route("/")
  // @route     GET /api/packagingTypes
  // @desc      Get All Packaging Types
  // @access    Private
  .get(getAllPackagingTypes)

  // @route     POST /api/packagingTypes
  // @desc      Add New Packaging Type
  // @access    Private
  .post(validatePackagingType, validateRequest, addPackagingTypes);

router
  .route("/:id")
  // @route     GET /api/packagingTypes/:id
  // @desc      Get Packaging Type by ID
  // @access    Private
  .get(getPackagingTypeByID)

  // @route     POST /api/packagingTypes/:id
  // @desc      Update Packaging Type by ID
  // @access    Private
  .patch(validatePackagingType, validateRequest, updatePackagingTypeByID)

  // @route     DELETE /api/packagingTypes/:id
  // @desc      Delete Packaging Type by ID
  // @access    Private
  .delete(deletePackagingTypeByID);

//* =============================================

export default router;
