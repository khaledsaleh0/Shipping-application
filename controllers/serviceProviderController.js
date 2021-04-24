import mongoose from "mongoose";
import ServiceProvider from "../models/serviceProviderModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll, getOne } from "./factoryhandler.js";

//* ==========================================================

//! Get All Packaging Types
export const getAllServiceProviders = getAll(ServiceProvider);

// ==========================================================

//! Add New Service Provider
export const addServiceProvider = catchAsync(async (req, res, next) => {
  if (req.body.type === "domestic") {
    delete req.body.scope;
  }
  const serviceProvider = await ServiceProvider.create(req.body);

  res.status(201).json({
    status: "success",
    message: `Service Provider is created Successfully`,
    data: serviceProvider,
  });
});

// ==========================================================

//! Get Service Provider By ID
export const getServiceProviderByID = getOne(ServiceProvider);

// ==========================================================

//! Get Service Provider related Shipments
export const getAllServiceProviderShipments = catchAsync(async (req, res, next) => {
  const { serviceProviderId } = req.params;
  const validServiceProvider = await ServiceProvider.findById(serviceProviderId);
  if (!validServiceProvider) {
    return next(new AppError(`No Service Providers found with that ID`, 404));
  }

  const shipment = await ServiceProvider.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(serviceProviderId) } },
    {
      $lookup: {
        from: "seashipments",
        let: { the_sp: "$_id" }, //! localField
        pipeline: [
          { $match: { $expr: { $eq: ["$serviceProvider", "$$the_sp"] } } }, //! foreignField
          {
            $project: {
              shipmentId: 1,
              spPaymentStatus: 1,
              shipmentType: "sea",
              costEgp: 1,
              costUsd: 1,
              costEur: 1,
              _id: 1,
            },
          }, //! select fields
        ],
        as: "seaShipments",
      },
    },
    {
      $lookup: {
        from: "airshipments",
        let: { the_sp: "$_id" }, //! localField
        pipeline: [
          { $match: { $expr: { $eq: ["$serviceProvider", "$$the_sp"] } } }, //! foreignField
          { $project: { shipmentId: 1, spPaymentStatus: 1, shipmentType: "air", cost: 1, _id: 1 } }, //! select fields
        ],
        as: "airShipments",
      },
    },
    {
      $project: {
        _id: 0,
        serviceProvider: {
          _id: "$_id",
          name: "$name",
          type: "$type",
          scope: "$scope",
        },
        shipments: { $concatArrays: ["$seaShipments", "$airShipments"] },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: shipment[0].shipments.length,
    data: shipment[0],
  });
});
