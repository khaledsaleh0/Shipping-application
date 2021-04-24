import { check } from "express-validator";
import CustomerClearanceAgent from "../models/customerClearanceAgentModel.js";
import SeaShipment from "../models/seaShipmentModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factoryhandler.js";

//* ==========================================================

//! Get All customerClearanceAgents
export const getAllcustomerClearanceAgents = getAll(CustomerClearanceAgent);

// ==========================================================

//! Add New customerClearanceAgent
export const validatecustomerClearanceAgent = [
  check("name", "Customer Clearance Agent Name is required.").trim().exists().notEmpty(),
];
export const addcustomerClearanceAgents = createOne(CustomerClearanceAgent);

// ==========================================================

//! Get customerClearanceAgent By ID
export const getcustomerClearanceAgentByID = getOne(CustomerClearanceAgent);

// ==========================================================

//! Update customerClearanceAgent By ID
export const updatecustomerClearanceAgentByID = updateOne(CustomerClearanceAgent);

// ==========================================================

//! Delete customerClearanceAgent By ID
export const deletecustomerClearanceAgentByID = deleteOne(CustomerClearanceAgent);

// ==========================================================

//! Get All shipments related to customerClearanceAgent by customerClearanceAgentID
export const getAllCustomerClearanceAgentShipments = catchAsync(async (req, res, next) => {
  const { customerClearanceAgentId } = req.params;
  const validCustomerClearanceAgent = await CustomerClearanceAgent.findById(
    customerClearanceAgentId
  );
  if (!validCustomerClearanceAgent) {
    return next(new AppError(`No Shipments found with that ID`, 404));
  }

  const shipments = await SeaShipment.find({ customerClearanceAgent: customerClearanceAgentId })
    .select("shipmentId customerClearanceAgent customerClearance")
    .populate({ path: "customerClearanceAgent", select: "name" });

  res.status(200).json({
    status: "success",
    results: shipments.length,
    data: shipments,
  });
});
