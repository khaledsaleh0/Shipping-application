import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addSeaShipment,
  deleteSeaShipmentByID,
  getAllSeaShipments,
  getSeaShipmentByID,
  updateSeaShipmentByID,
} from "../controllers/seaShipmentController.js";
import { isEmptyBody } from "../middlwares/requestMiddlwares.js";

import { validateRequest } from "../utils/authUtils.js";
import {
  validateSeaShipmentCreation,
  validateSeaShipmentUpdate,
} from "../validations/seaShipmentValidations.js";

const router = express.Router();

//* ============================================================

// /api/seaShipment

router.use(isUser);

router
  .route("/")
  // @route     GET /api/seaShipment
  // @desc      Get All Sea Shipments
  // @access    Private
  .get(getAllSeaShipments)

  // @route     POST /api/seaShipment
  // @desc      Add New Sea Shipment
  // @access    Private
  .post(validateSeaShipmentCreation, validateRequest, addSeaShipment);

router
  .route("/:id")
  // @route     GET /api/seaShipment/:id
  // @desc      Get Sea Shipment by ID
  // @access    Private
  .get(getSeaShipmentByID)

  // @route     POST /api/seaShipment/:id
  // @desc      Update Sea Shipment by ID
  // @access    Private
  .patch(isEmptyBody, validateSeaShipmentUpdate, validateRequest, updateSeaShipmentByID)

  // @route     DELETE /api/seaShipment/:id
  // @desc      Delete Sea Shipment by ID
  // @access    Private
  .delete(deleteSeaShipmentByID);

//* =============================================

export default router;
