import { check } from "express-validator";

const types = ["trucking", "cc", "sp", "customer"];

export const validatePaymentStatement = [
  check("type", "Type is Required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isIn(types)
    .withMessage(`Available Types Are ${types}.`),
  check("vendor", "Vendor is Required.").notEmpty(),
  // check("paymentDate", "Payment Date is required.")
  // .trim()
  // .notEmpty()
  //   .isDate("Please Provide a Valid Date"),
  check("amount", "Payment Amount is required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Payment Number"),
];
