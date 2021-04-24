import express from "express";
import {
  getAllAirShipments,
  addAirShipment,
  getAirShipmentByID,
  updateAirShipmentByID,
  deleteAirShipmentByID,
} from "../controllers/airShipmentController.js";
import { isUser } from "../controllers/authController.js";
import { isEmptyBody } from "../middlwares/requestMiddlwares.js";

import { validateRequest } from "../utils/authUtils.js";
import {
  validateAirShipmentCreation,
  validateAirShipmentUpdate,
} from "../validations/airShipmentValidations.js";

const router = express.Router();

//* ============================================================

// /api/airShipments

router.use(isUser);

router
  .route("/")
  // @route     GET /api/airShipments
  // @desc      Get All Air Shipments
  // @access    Private
  .get(getAllAirShipments)

  // @route     POST /api/airShipments
  // @desc      Add New Air Shipment
  // @access    Private
  .post(validateAirShipmentCreation, validateRequest, addAirShipment);

router
  .route("/:id")
  // @route     GET /api/airShipments/:id
  // @desc      Get Air Shipment by ID
  // @access    Private
  .get(getAirShipmentByID)

  // @route     POST /api/airShipments/:id
  // @desc      Update Air Shipment by ID
  // @access    Private
  .patch(isEmptyBody, validateAirShipmentUpdate, validateRequest, updateAirShipmentByID)

  // @route     DELETE /api/airShipments/:id
  // @desc      Delete Air Shipment by ID
  // @access    Private
  .delete(deleteAirShipmentByID);

//* =============================================

export default router;
