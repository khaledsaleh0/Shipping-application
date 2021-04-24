import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addServiceProvider,
  getAllServiceProviders,
  getAllServiceProviderShipments,
  getServiceProviderByID,
} from "../controllers/serviceProviderController.js";

import { validateRequest } from "../utils/authUtils.js";
import { validateServiceProviderCreation } from "../validations/serviceProviderValidations.js";
import paymentStatementRouter from "./paymentStatementRoutes.js";

const router = express.Router();

//* ============================================================

// /api/serviceProviders

router.use(isUser);

router
  .route("/")
  // @route     GET /api/serviceProviders
  // @desc      Get All Service Providers
  // @access    Private
  .get(getAllServiceProviders)

  // @route     POST /api/serviceProviders
  // @desc      Add New Service Provider
  // @access    Private
  .post(validateServiceProviderCreation, validateRequest, addServiceProvider);

router
  .route("/:id")
  // @route     GET /api/serviceProviders/:id
  // @desc      Get Service Provider by ID
  // @access    Private
  .get(getServiceProviderByID);

// @route     POST /api/serviceProviders/:id
// @desc      Update Service Provider by ID
// @access    Private
// .patch(validateServiceProvider, validateRequest, updateServiceProviderByID)

// @route     DELETE /api/serviceProviders/:id
// @desc      Delete Service Provider by ID
// @access    Private
// .delete(deleteServiceProviderByID);

router
  .route("/:serviceProviderId/shipments")
  // @route     GET /api/serviceProviders/:serviceProviderId/shipments
  // @desc      Get All shipments related to ServiceProvider by ServiceProviderID
  // @access    Private
  .get(getAllServiceProviderShipments);

// @route     GET /api/serviceProviders/:vendorId/paymentStatements
// @desc      Get All Paid Statements related to customer by customerID
// @access    Private
router.use("/:vendorId/paymentStatements", paymentStatementRouter);

//* =============================================

export default router;
