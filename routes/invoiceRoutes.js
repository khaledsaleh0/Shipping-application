import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addNewInvoice,
  getAllInvoices,
  getInvoiceByID,
  updateInvoiceByID,
  deleteInvoiceByID,
} from "../controllers/invoiceController.js";
import { isEmptyBody } from "../middlwares/requestMiddlwares.js";
import { validateRequest } from "../utils/authUtils.js";
import {
  validateInvoiceCreation,
  validateInvoiceUpdate,
} from "../validations/invoiceValidations.js";

const router = express.Router({ mergeParams: true });

//* ============================================================

// /api/invoices

router.use(isUser);

router
  .route("/")
  // @route     GET /api/invoices || /api/shipments/:shipmentId/invoices
  // @desc      Get All Invoices  || Get All Invoices related to shipment
  // @access    Private
  .get(getAllInvoices)

  // @route     POST /api/shipments/:shipmentId/invoices
  // @desc      Add New Invoice
  // @access    Private
  .post(validateInvoiceCreation, validateRequest, addNewInvoice);

router
  .route("/:id")
  // @route     GET /api/invoices/:id
  // @desc      Get Invoice by ID
  // @access    Private
  .get(getInvoiceByID)

  // @route     POST /api/invoices/:id
  // @desc      Update Invoice by ID
  // @access    Private
  .patch(isEmptyBody, validateInvoiceUpdate, validateRequest, updateInvoiceByID)

  // @route     DELETE /api/invoices/:id
  // @desc      Delete Invoice by ID
  // @access    Private
  .delete(deleteInvoiceByID);

//* =============================================

export default router;
