import { check } from "express-validator";
import SeaShipment from "../models/seaShipmentModel.js";
import TruckingAgent from "../models/truckingAgentModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factoryhandler.js";

//* ==========================================================

//! Get All TruckingAgents
export const getAllTruckingAgents = getAll(TruckingAgent);

// ==========================================================

//! Add New TruckingAgent
export const validateTruckingAgent = [
  check("name", "Trucking Agent Name is required.").trim().exists().notEmpty(),
];
export const addTruckingAgents = createOne(TruckingAgent);

// ==========================================================

//! Get TruckingAgent By ID
export const getTruckingAgentByID = getOne(TruckingAgent);

// ==========================================================

//! Update TruckingAgent By ID
export const updateTruckingAgentByID = updateOne(TruckingAgent);

// ==========================================================

//! Delete TruckingAgent By ID
export const deleteTruckingAgentByID = deleteOne(TruckingAgent);

// ==========================================================

//! Get All shipments related to TruckingAgent by TruckingAgentID
export const getAllTruckingAgentShipments = catchAsync(async (req, res, next) => {
  const { truckingAgentId } = req.params;
  const validTruckingAgent = await TruckingAgent.findById(truckingAgentId);
  if (!validTruckingAgent) {
    return next(new AppError(`No Shipments found with that ID`, 404));
  }

  const shipments = await SeaShipment.find({ truckingAgent: truckingAgentId })
    .select("shipmentId truckingAgent truckingCost")
    .populate({ path: "truckingAgent", select: "name" });

  res.status(200).json({
    status: "success",
    results: shipments.length,
    data: shipments,
  });
});
