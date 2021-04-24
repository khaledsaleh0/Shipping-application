import { check } from "express-validator";

const seaShipmentTypes = ["lcl", "fcl"];
const containerTypes = ["20dc", "40dc", "20rf", "40rf"];

export const validateSeaShipmentCreation = [
  check("shipmentId", "Don't Provide Sea Shipment Id, it is automatically generated.")
    .not()
    .exists(),
  check("customer", "Customer Name is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("shipmentType", "Sea Shipment type is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isIn(seaShipmentTypes)
    .withMessage(`Available Types Are ${seaShipmentTypes}.`),
  check("serviceProvider", "Service Provider is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("costEgp", "Shipment EGP Cost is required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Cost Number"),
  check("costUsd", "Shipment USD Cost is required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Cost Number"),
  check("costEur", "Shipment EUR Cost is required.")
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
  check("truckingCost", "Trucking Cost is required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Trucking Cost Number"),
  check("truckingAgent", "Trucking Agent is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("customerClearance", "Customer Clearance is required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Customer Clearance Number"),
  check("customerClearanceAgent", "Customer Clearance Agent is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("pol", "POL is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("pod", "POD is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID")
    .custom((value, { req }) => {
      if (req.body.pol === value) {
        throw new Error(`POL and POD Are The Same, Please Provide different Ports.`);
      } else {
        return req;
      }
    }),

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
  check("items.*.packagesNum", "Packages Number is Required.")
    .exists()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Packages Number"),

  check("invoiceStatus", "Don't Provide Invoice Status.").not().exists(),

  check("containerNum").custom((value, { req }) => {
    if (req.body.shipmentType === "fcl" && !/^\d*\.?\d+$/.test(value)) {
      throw new Error(`Container Number is Required. Please provide a valid number.`);
    } else if (req.body.shipmentType === "lcl" && value) {
      throw new Error(`Don't Provide Container Number for LCL.`);
    }
    return req;
  }),
  check("containerType").custom((value, { req }) => {
    if (req.body.shipmentType === "fcl") {
      if (!value) throw new Error(`Container Type is Required.`);
      if (!containerTypes.includes(value))
        throw new Error(`Available Container Types Are ${containerTypes}.`);
    } else if (req.body.shipmentType === "lcl" && value) {
      throw new Error(`Don't Provide Container Type for LCL.`);
    }
    return req;
  }),
];

export const validateSeaShipmentUpdate = [
  check("shipmentId", "Don't Provide Sea Shipment Id, it is automatically generated.")
    .not()
    .exists(),
  check("customer", "You Cannot update related Customer.").not().exists(),
  check("shipmentType", "Sea Shipment type is required.")
    .optional()
    .trim()
    .notEmpty()
    .bail()
    .isIn(seaShipmentTypes)
    .withMessage(`Available Types Are ${seaShipmentTypes}.`),
  check("serviceProvider", "Service Provider is required.")
    .optional()
    .trim()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("costEgp", "Shipment EGP Cost is required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Cost Number"),
  check("costUsd", "Shipment USD Cost is required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Cost Number"),
  check("costEur", "Shipment EUR Cost is required.")
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
  check("truckingCost", "Trucking Cost is required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Trucking Cost Number"),
  check("truckingAgent", "Trucking Agent is required.")
    .optional()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("customerClearance", "Customer Clearance is required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Customer Clearance Number"),
  check("customerClearanceAgent", "Customer Clearance Agent is required.")
    .optional()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),
  check("pol", "POL is required.")
    .optional()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID"),

  check("pod", "POD is required.")
    .optional()
    .exists()
    .notEmpty()
    .bail()
    .isMongoId()
    .withMessage("Please Provide a valid ID")
    .custom((value, { req }) => {
      if (req.body.pol === value) {
        throw new Error(`POL and POD Are The Same, Please Provide different Ports.`);
      } else {
        return req;
      }
    }),

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
  check("items.*.packagesNum", "Packages Number is Required.")
    .optional()
    .bail()
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Please Provide a Valid Packages Number"),

  check("invoiceStatus", "Don't Provide Invoice Status.").not().exists(),

  check("containerNum").custom((value, { req }) => {
    if (req.body.shipmentType === "fcl" && !/^\d*\.?\d+$/.test(value)) {
      throw new Error(`Container Number is Required. Please provide a valid number.`);
    } else if (req.body.shipmentType === "lcl" && value) {
      throw new Error(`Don't Provide Container Number for LCL.`);
    }
    return req;
  }),
  check("containerType").custom((value, { req }) => {
    if (req.body.shipmentType === "fcl") {
      if (!value) throw new Error(`Container Type is Required.`);
      if (!containerTypes.includes(value))
        throw new Error(`Available Container Types Are ${containerTypes}.`);
    } else if (req.body.shipmentType === "lcl" && value) {
      throw new Error(`Don't Provide Container Type for LCL.`);
    }
    return req;
  }),
];
