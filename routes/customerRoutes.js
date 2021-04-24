import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addNewCustomer,
  deleteCustomerByID,
  getAllCustomerRelatedShipments,
  getAllCustomers,
  getCustomerByID,
  updateCustomerByID,
  validateCustomer,
} from "../controllers/customerController.js";
import { validateRequest } from "../utils/authUtils.js";
import paymentStatementRouter from "./paymentStatementRoutes.js";

const router = express.Router();

//* ============================================================

// /api/customers

router.use(isUser);

router
  .route("/")
  // @route     GET /api/customers
  // @desc      Get All Customers
  // @access    Private
  .get(getAllCustomers)
  // @route     POST /api/customers
  // @desc      Add New Customer
  // @access    Private
  .post(validateCustomer, validateRequest, addNewCustomer);

router
  .route("/:id")
  // @route     GET /api/customers/:id
  // @desc      Get Customer by ID
  // @access    Private
  .get(getCustomerByID)

  // @route     POST /api/customers/:id
  // @desc      Update Customer by ID
  // @access    Private
  .patch(updateCustomerByID)

  // @route     DELETE /api/customers/:id
  // @desc      Delete Customer by ID
  // @access    Private
  .delete(deleteCustomerByID);

router
  .route("/:customerId/shipments")
  // @route     GET /api/customers/:customerId/seaShipment
  // @desc      Get All shipments related to customer by customerID
  // @access    Private
  .get(getAllCustomerRelatedShipments);

// @route     GET /api/customers/:vendorId/paymentStatements
// @desc      Get All Paid Statements related to customer by customerID
// @access    Private
router.use("/:vendorId/paymentStatements", paymentStatementRouter);

//* =============================================

export default router;
