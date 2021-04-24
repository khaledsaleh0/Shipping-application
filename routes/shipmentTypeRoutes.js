import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addShipmentTypes,
  deleteShipmentTypeByID,
  getAllShipmentTypes,
  getShipmentTypeByID,
  updateShipmentTypeByID,
  validateShipmentType,
} from "../controllers/shipmentTypeController.js";
import { validateRequest } from "../utils/authUtils.js";

const router = express.Router();

//* ============================================================

// /api/shipmentTypes

router.use(isUser);

router
  .route("/")
  // @route     GET /api/shipmentTypes
  // @desc      Get All Shipment Types
  // @access    Private
  .get(getAllShipmentTypes)

  // @route     POST /api/shipmentTypes
  // @desc      Add New Shipment Type
  // @access    Private
  .post(validateShipmentType, validateRequest, addShipmentTypes);

router
  .route("/:id")
  // @route     GET /api/shipmentTypes/:id
  // @desc      Get Shipment Type by ID
  // @access    Private
  .get(getShipmentTypeByID)

  // @route     POST /api/shipmentTypes/:id
  // @desc      Update Shipment Type by ID
  // @access    Private
  .patch(validateShipmentType, validateRequest, updateShipmentTypeByID)

  // @route     DELETE /api/shipmentTypes/:id
  // @desc      Delete Shipment Type by ID
  // @access    Private
  .delete(deleteShipmentTypeByID);

//* =============================================

export default router;
