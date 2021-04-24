import { check } from "express-validator";
import PackagingType from "../models/packagingTypeModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factoryhandler.js";

//* ==========================================================

//! Get All Packaging Types
export const getAllPackagingTypes = getAll(PackagingType);

// ==========================================================

//! Add New Packaging Type
export const validatePackagingType = [
  check("packagingType", "Packaging Type is required.")
    .trim()
    .exists()
    .notEmpty(),
];
export const addPackagingTypes = createOne(PackagingType);

// ==========================================================

//! Get PackagingType By ID
export const getPackagingTypeByID = getOne(PackagingType);

// ==========================================================

//! Update PackagingType By ID
export const updatePackagingTypeByID = updateOne(PackagingType);

// ==========================================================

//! Delete PackagingType By ID
export const deletePackagingTypeByID = deleteOne(PackagingType);
