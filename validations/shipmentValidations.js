import { check } from "express-validator";
//* ==========================================================

export const validateShipmentCreation = [
  check("shipmentId", "Don't Provide Shipment Id, it is automatically generated.").not().exists(),

  check("from.customerId", "Customer Name is required.").trim(),

  check("from.customerName", "Customer Name is required.").trim().exists().notEmpty(),

  check("from.contactPerson", "Contact Person is required.").trim().exists().notEmpty(),

  check("from.customerEmail", "Customer Email is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage("Please include a valid Email."),

  check("from.customerPhone", "Customer Phone Number is required.").trim().exists().notEmpty(),

  check("from.address", "Address is required.").trim().exists().notEmpty(),

  check("from.country", "Country is required.").trim().exists().notEmpty(),

  check("from.city", "City is required.").trim().exists().notEmpty(),

  // check("from.dateOfCollection", "Date of Collection is required.")
  //   .trim()
  //   .exists()
  //   .notEmpty()
  //   .isDate("Please Provide a Valid Date"),

  check("to.contactPerson", "Contact Person is required.").trim().exists().notEmpty(),

  check("to.email", "Email is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage("Please include a valid Email."),

  check("to.phone", "Phone Number is required.").trim().exists().notEmpty(),

  check("to.address", "Address is required.").trim().exists().notEmpty(),

  check("to.country", "Country is required.").trim().exists().notEmpty(),

  check("to.city", "City is required.").trim().exists().notEmpty(),

  // check("to.dateOfDelivery", "Date of Delivery is required.")
  //   .trim()
  //   .exists()
  //   .notEmpty()
  //   .isDate("Please Provide a Valid Date"),

  check("items", "Items are Required.")
    .isArray()
    .custom((items, { req }) => items && items.length > 0)
    .withMessage("At least one item is required."),

  check("items.*.itemName", "Item Name is Required.").trim().exists().notEmpty(),

  check("items.*.itemDetails", "Item Details is Required.").trim().exists().notEmpty(),

  check("items.*.itemWeight", "Item Weight is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.itemLength", "Item Length is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.itemWidth", "Item Width is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.itemHeight", "Item Height is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.deliveryCost", "Item Delivery Cost is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.commission", "Item Commession is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.taxes", "Item Taxes is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.shipmentType", "Item Shipment Type is Required.").trim().exists().notEmpty(),

  check("items.*.packagingType", "Item Packaging Type is Required.").trim().exists().notEmpty(),

  check("items.*.packagingCost", "Item Packaging Cost is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("invoiceStatus", "Don't Provide Invoice Status.").not().exists(),
];

// ==========================================================

export const validateShipmentUpdate = [
  check("shipmentId", "Don't Provide Shipment Id, it is automatically generated.").not().exists(),

  // check("from.customerId", "Customer Id is required.").optional().trim().notEmpty(),
  check("from.customerId", "You Cannot update related Customer.").not().exists(),

  check("from.customerName", "Customer Name is required.").optional().trim().notEmpty(),

  check("from.contactPerson", "Contact Person is required.").optional().trim().notEmpty(),

  check("from.customerEmail", "Customer Email is required.")
    .optional()
    .trim()
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage("Please include a valid Email."),

  check("from.customerPhone", "Customer Phone Number is required.").optional().trim().notEmpty(),

  check("from.address", "Address is required.").optional().trim().notEmpty(),

  check("from.country", "Country is required.").optional().trim().notEmpty(),

  check("from.city", "City is required.").optional().trim().notEmpty(),

  // check("from.dateOfCollection", "Date of Collection is required.")
  //   .optional()
  //   .trim()
  //   .notEmpty()
  //   .isDate("Please Provide a Valid Date"),

  check("to.contactPerson", "Contact Person is required.").optional().trim().notEmpty(),

  check("to.email", "Email is required.")
    .optional()
    .trim()
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage("Please include a valid Email."),

  check("to.phone", "Phone Number is required.").optional().trim().notEmpty(),

  check("to.address", "Address is required.").optional().trim().notEmpty(),

  check("to.country", "Country is required.").optional().trim().notEmpty(),

  check("to.city", "City is required.").optional().trim().notEmpty(),

  // check("to.dateOfDelivery", "Date of Delivery is required.")
  //   .optional()
  //   .trim()
  //   .notEmpty()
  //   .isDate("Please Provide a Valid Date"),

  check("items", "Items are Required.")
    .isArray()
    .custom((items, { req }) => items && items.length > 0)
    .withMessage("At least one item is required."),

  check("items.*.itemName", "Item Name is Required.").optional().trim().notEmpty(),

  check("items.*.itemDetails", "Item Details is Required.").optional().trim().notEmpty(),

  check("items.*.itemWeight", "Item Weight is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.itemLength", "Item Length is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.itemWidth", "Item Width is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.itemHeight", "Item Height is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.deliveryCost", "Item Delivery Cost is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.commission", "Item Commession is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.taxes", "Item Taxes is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("items.*.shipmentType", "Item Shipment Type is Required.").optional().trim().notEmpty(),

  check("items.*.packagingType", "Item Packaging Type is Required.").optional().trim().notEmpty(),

  check("items.*.packagingCost", "Item Packaging Cost is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Number"),

  check("invoiceStatus", "Don't Provide Invoice Status.").not().exists(),
];

// ,
// {
//     "itemName": "item 1",
//     "itemDetails": "details item 1",
//     "itemWeight": 2,
//     "itemLength": 3,
//     "itemWidth": 2,
//     "itemHeight": 4,
//     "deliveryCost": 50,
//     "commission": 30,
//     "taxes": 10,
//     "shipmentType": "shipment type 3",
//     "packagingType": "packaging type 1",
//     "packagingCost": "12"
// }
