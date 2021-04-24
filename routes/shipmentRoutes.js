import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addNewShipment,
  deleteShipmentByID,
  getAllShipments,
  getShipmentByID,
  getShipmentItemByID,
  updateShipmentByID,
} from "../controllers/shipmentController.js";
import { isEmptyBody } from "../middlwares/requestMiddlwares.js";
import { validateRequest } from "../utils/authUtils.js";
import {
  validateShipmentCreation,
  validateShipmentUpdate,
} from "../validations/shipmentValidations.js";

import invoiceRouter from "./invoiceRoutes.js";

const router = express.Router();

//* ============================================================

// /api/shipments

router.use(isUser);

router
  .route("/")
  // @route     GET /api/shipments
  // @desc      Get All Shipments
  // @access    Private
  .get(getAllShipments)

  // @route     POST /api/shipments
  // @desc      Add New Shipment
  // @access    Private
  .post(validateShipmentCreation, validateRequest, addNewShipment);

router
  .route("/:id")
  // @route     GET /api/shipments/:id
  // @desc      Get Shipment by ID
  // @access    Private
  .get(getShipmentByID)

  // @route     POST /api/shipments/:id
  // @desc      Update Shipment by ID
  // @access    Private
  .patch(isEmptyBody, validateShipmentUpdate, validateRequest, updateShipmentByID)

  // @route     DELETE /api/shipments/:id
  // @desc      Delete Shipment by ID
  // @access    Private
  .delete(deleteShipmentByID);

router
  .route("/:shipmentId/shipmentItems/:shipmentItemId")
  // @route     GET /api/shipments/:shipmentId/shipmentItems/:shipmentItemId
  // @desc      Get Shipment Item by ID
  // @access    Private
  .get(getShipmentItemByID);

// @route     GET /api/shipments/:shipmentId/shipmentItems/:shipmentItemId
// @desc      Update Shipment Item by ID
// @access    Private
// .patch(updateShipmentItemByID);

//* ============================================================

// @route     GET /api/shipments/:shipmentId/shipmentItems/:shipmentItemId
// @desc      Get All Invoices Under Shipment
// @access    Private
router.use("/:shipmentId/invoices", invoiceRouter);

//* =============================================

export default router;
