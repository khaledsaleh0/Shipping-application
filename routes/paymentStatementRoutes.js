import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  createNewPaymentStatement,
  getAllPaymentStatements,
} from "../controllers/paymentStatementController.js";
import { validateRequest } from "../utils/authUtils.js";
import { validatePaymentStatement } from "../validations/paymentValidations.js";

const router = express.Router({ mergeParams: true });

//* ============================================================

// /api/paymentStatements

router.use(isUser);

router
  .route("/")
  // @route     GET /api/paymentStatements || api/{vendor}/:vendorId/paymentStatements
  // @desc      Get All PaymentStatements  || Get All Paid Statements for a vendor
  // @access    Private
  .get(getAllPaymentStatements)

  // @route     POST /api/paymentStatements
  // @desc      Add New PaymentStatement (customer/cc/trucking)
  // @access    Private
  .post(validatePaymentStatement, validateRequest, createNewPaymentStatement);

router.route("/sp");
// @route     POST /api/paymentStatements
// @desc      Add New PaymentStatement (customer/cc/trucking)
// @access    Private
// .post(validatePaymentStatement, validateRequest, createNewSPPaymentStatement);

router.route("/:id");
// @route     GET /api/paymentStatements/:id
// @desc      Get PaymentStatement by ID
// @access    Private
// .get(getPaymentStatementByID)

// @route     POST /api/paymentStatements/:id
// @desc      Update PaymentStatement by ID
// @access    Private
// .patch(updatePaymentStatementByID);

// @route     DELETE /api/paymentStatements/:id
// @desc      Delete PaymentStatement by ID
// @access    Private
// .delete(deletePaymentStatementByID);

//* =============================================

export default router;
