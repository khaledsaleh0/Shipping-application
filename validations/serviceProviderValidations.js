import { check } from "express-validator";
//* ==========================================================

const shipmentTypes = ["air", "sea", "domestic"];
const scopes = ["plane", "express", "lcl", "fcl"];

export const validateServiceProviderCreation = [
  check("name", "Service Provider name is required.").trim().exists().notEmpty(),
  check("type", "Service Provider type is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isIn(shipmentTypes)
    .withMessage(`Available Types Are ${shipmentTypes}.`),

  // type domestic scope optional

  check("scope")
    .if((value, { req }) => req.body.type === "air" || req.body.type === "sea")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("Scope is Required")
    .bail()
    .custom((value, { req }) => {
      if ((req.body.type === "sea" || req.body.type === "air") && !scopes.includes(value)) {
        throw new Error(`Available Scopes Are ${scopes}.`);
      } else if (req.body.type === "sea" && !["lcl", "fcl"].includes(value)) {
        throw new Error("Sea Scopes are 'lcl' or 'fcl'");
      } else if (req.body.type === "air" && !["plane", "express"].includes(value))
        throw new Error("Air Scopes are 'plane' or 'express'");
      return req;
    }),
];
