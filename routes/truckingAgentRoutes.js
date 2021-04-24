import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addTruckingAgents,
  deleteTruckingAgentByID,
  getAllTruckingAgents,
  getAllTruckingAgentShipments,
  getTruckingAgentByID,
  updateTruckingAgentByID,
  validateTruckingAgent,
} from "../controllers/truckingAgentController.js";
import { validateRequest } from "../utils/authUtils.js";
import paymentStatementRouter from "./paymentStatementRoutes.js";

const router = express.Router();

//* ============================================================

// /api/truckingAgents

router.use(isUser);

router
  .route("/")
  // @route     GET /api/truckingAgents
  // @desc      Get All TruckingAgents
  // @access    Private
  .get(getAllTruckingAgents)

  // @route     POST /api/truckingAgents
  // @desc      Add New TruckingAgent
  // @access    Private
  .post(validateTruckingAgent, validateRequest, addTruckingAgents);

router
  .route("/:id")
  // @route     GET /api/truckingAgents/:id
  // @desc      Get TruckingAgent by ID
  // @access    Private
  .get(getTruckingAgentByID)

  // @route     POST /api/truckingAgents/:id
  // @desc      Update TruckingAgent by ID
  // @access    Private
  .patch(validateTruckingAgent, validateRequest, updateTruckingAgentByID)

  // @route     DELETE /api/truckingAgents/:id
  // @desc      Delete TruckingAgent by ID
  // @access    Private
  .delete(deleteTruckingAgentByID);

router
  .route("/:truckingAgentId/shipments")
  // @route     GET /api/truckingAgents/:truckingAgentId/seaShipment
  // @desc      Get All shipments related to TruckingAgent by TruckingAgentID
  // @access    Private
  .get(getAllTruckingAgentShipments);

// @route     GET /api/truckingAgents/:vendorId/paymentStatements
// @desc      Get All Paid Statements related to truckingAgents by its ID
// @access    Private
router.use("/:vendorId/paymentStatements", paymentStatementRouter);
//* =============================================

export default router;
