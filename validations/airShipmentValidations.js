import { check } from "express-validator";

const airShipmentTypes = ["plane", "express"];

export const validateAirShipmentCreation = [
  check("shipmentId", "Don't Provide Air Shipment Id, it is automatically generated.")
    .not()
    .exists(),
  check("customer", "Customer Name is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("shipmentType", "Air Shipment type is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isIn(airShipmentTypes)
    .withMessage(`Available Types Are ${airShipmentTypes}.`),
  check("serviceProvider", "Service Provider is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("cost", "Shipment Cost is required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Cost Number"),
  check("sellingCost", "Selling Cost is required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Selling Cost Number"),
  check("blNum", "BL Number is required.").trim().exists().notEmpty(),
  check("items", "Items are Required.")
    .isArray()
    .custom((items, { req }) => items && items.length > 0)
    .withMessage("At least one item is required."),
  check("items.*.itemWeight", "Item Weight is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Weight Number"),
  check("items.*.itemLength", "Item Length is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Length Number"),
  check("items.*.itemWidth", "Item Width is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Width Number"),
  check("items.*.itemHeight", "Item Height is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Height Number"),

  check("invoiceStatus", "Don't Provide Invoice Status.").not().exists(),
];

export const validateAirShipmentUpdate = [
  check("shipmentId", "Don't Provide Air Shipment Id, it is automatically generated.")
    .not()
    .exists(),
  check("customer", "You Cannot update related Customer.").not().exists(),
  check("shipmentType", "Air Shipment type is required.")
    .optional()
    .trim()
    .notEmpty()
    .bail()
    .isIn(airShipmentTypes)
    .withMessage(`Available Types Are ${airShipmentTypes}.`),
  check("serviceProvider", "Service Provider is required.")
    .optional()
    .trim()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("cost", "Shipment Cost is required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Cost Number"),
  check("sellingCost", "Selling Cost is required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Selling Cost Number"),
  check("blNum", "BL Number is required.").optional().trim().notEmpty(),
  check("items", "Items are Required.")
    .isArray()
    .custom((items, { req }) => items && items.length > 0)
    .withMessage("At least one item is required."),
  check("items.*.itemWeight", "Item Weight is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Weight Number"),
  check("items.*.itemLength", "Item Length is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Length Number"),
  check("items.*.itemWidth", "Item Width is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Width Number"),
  check("items.*.itemHeight", "Item Height is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Height Number"),

  check("invoiceStatus", "Don't Provide Invoice Status.").not().exists(),
];
