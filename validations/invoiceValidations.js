import { check } from "express-validator";
//* ==========================================================

export const validateInvoiceCreation = [
  check("shipment", "Don't Provide Shipment Id.").not().exists(),
  check("invoiceId", "Don't Provide Invoice Id, it is automatically generated.").not().exists(),
  check("paymentStatus", "Don't Provide Payment Status.").not().exists(),
  check("paymentMethod", "Don't Provide Payment Method.").not().exists(),
  check("paymentAmount", "Don't Provide Payment Amount.").not().exists(),
];

export const validateInvoiceUpdate = [
  check("shipment", "Don't Provide Shipment Id.").not().exists(),
  check("invoiceId", "Don't Provide Invoice Id, it is automatically generated.").not().exists(),
  check("paymentStatus", "Payment Status is Required.").optional().trim().notEmpty(),
  check("paymentMethod", "Payment Method is Required.").optional().trim().notEmpty(),
  check("paymentAmount", "Payment Amount is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),
];
