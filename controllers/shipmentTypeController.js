import { check } from "express-validator";
import ShipmentType from "../models/shipmentTypeModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factoryhandler.js";

//* ==========================================================

//! Get All Shipment Types
export const getAllShipmentTypes = getAll(ShipmentType);

// ==========================================================

//! Add New Shipment Types
export const validateShipmentType = [
  check("shipmentType", "Shipment Type is required.")
    .trim()
    .exists()
    .notEmpty(),
];
export const addShipmentTypes = createOne(ShipmentType);

// ==========================================================

//! Get Category By ID
export const getShipmentTypeByID = getOne(ShipmentType);

// ==========================================================

//! Update Category By ID
export const updateShipmentTypeByID = updateOne(ShipmentType);

// ==========================================================

//! Delete Category By ID
export const deleteShipmentTypeByID = deleteOne(ShipmentType);
