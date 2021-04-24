import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addcustomerClearanceAgents,
  deletecustomerClearanceAgentByID,
  getAllcustomerClearanceAgents,
  getAllCustomerClearanceAgentShipments,
  getcustomerClearanceAgentByID,
  updatecustomerClearanceAgentByID,
  validatecustomerClearanceAgent,
} from "../controllers/customerClearanceAgentController.js";
import { validateRequest } from "../utils/authUtils.js";
import paymentStatementRouter from "./paymentStatementRoutes.js";

const router = express.Router();

//* ============================================================

// /api/customerClearanceAgent

router.use(isUser);

router
  .route("/")
  // @route     GET /api/customerClearanceAgents
  // @desc      Get All Customer Clearance Agents
  // @access    Private
  .get(getAllcustomerClearanceAgents)

  // @route     POST /api/customerClearanceAgents
  // @desc      Add New Customer Clearance Agent
  // @access    Private
  .post(validatecustomerClearanceAgent, validateRequest, addcustomerClearanceAgents);

router
  .route("/:id")
  // @route     GET /api/customerClearanceAgents/:id
  // @desc      Get Customer Clearance Agent by ID
  // @access    Private
  .get(getcustomerClearanceAgentByID)

  // @route     POST /api/customerClearanceAgents/:id
  // @desc      Update Customer Clearance Agent by ID
  // @access    Private
  .patch(validatecustomerClearanceAgent, validateRequest, updatecustomerClearanceAgentByID)

  // @route     DELETE /api/customerClearanceAgents/:id
  // @desc      Delete Customer Clearance Agent by ID
  // @access    Private
  .delete(deletecustomerClearanceAgentByID);

router
  .route("/:customerClearanceAgentId/shipments")
  // @route     GET /api/customerClearanceAgents/:customerClearanceAgentId/seaShipment
  // @desc      Get All shipments related to customerClearanceAgent by customerClearanceAgentID
  // @access    Private
  .get(getAllCustomerClearanceAgentShipments);

// @route     GET /api/customerClearanceAgentId/:vendorId/paymentStatements
// @desc      Get All Paid Statements related to customerClearanceAgent by its ID
// @access    Private
router.use("/:vendorId/paymentStatements", paymentStatementRouter);
//* =============================================

export default router;
