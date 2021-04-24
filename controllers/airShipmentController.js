import AirShipment from "../models/airShipmentModel.js";
import _merge from "lodash/merge.js";
import Customer from "../models/customerModel.js";
import ServiceProvider from "../models/serviceProviderModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne } from "./factoryhandler.js";

//* ==========================================================

//! Get All Shipments
export const getAllAirShipments = getAll(AirShipment, [
  { path: "customer", select: "name email" },
  { path: "serviceProvider", select: "name type scope" },
]);

// ==========================================================

//! Add New Air Shipment
export const addAirShipment = catchAsync(async (req, res, next) => {
  const { serviceProvider, shipmentType, customer } = req.body;
  // validate customer
  const validCustomer = await Customer.findById(customer);
  if (!validCustomer) {
    return next(new AppError(`Customer Provided is not Found.`, 404));
  }
  // validate Service Provider
  const validServiceProvider = await ServiceProvider.findOne({
    _id: serviceProvider,
    scope: shipmentType,
  });
  if (!validServiceProvider) {
    return next(new AppError(`Not Valid Service Provider, Please Provide a Valid one.`, 404));
  }

  // create air shipment
  const shipment = await AirShipment.create(req.body);

  if (shipment) {
    // increment custom shipmentId
    shipment.setNext("air_shipment_seq", (err, shipment) => {
      if (err) return next(new AppError(err, 500));

      res.status(201).json({
        status: "success",
        message: `New Air Shipment is created successfully`,
        data: shipment,
      });
    });
  }
});

// ==========================================================

//! Get Air Shipment by ID
export const getAirShipmentByID = getOne(AirShipment, "serviceProvider customer");

// ==========================================================

//! Update Air Shipment by ID
export const updateAirShipmentByID = catchAsync(async (req, res, next) => {
  const oldShipment = await AirShipment.findById(req.params.id).lean();
  if (!oldShipment) {
    return next(new AppError(`No Air Shipment found with that ID`, 404));
  }

  // validate Service Provider if updated
  if (
    (req.body.serviceProvider && req.body.serviceProvider != oldShipment.serviceProvider) ||
    (req.body.shipmentType && req.body.shipmentType != oldShipment.shipmentType)
  ) {
    const validServiceProvider = await ServiceProvider.findOne({
      _id: req.body.serviceProvider,
      scope: req.body.shipmentType,
    });
    if (!validServiceProvider) {
      return next(new AppError(`Not Valid Service Provider, Please Provide a Valid one.`, 404));
    }
  }

  delete oldShipment.items;

  const shipmentUpdates = _merge({}, oldShipment, req.body);

  const newShipment = await AirShipment.findByIdAndUpdate(oldShipment._id, shipmentUpdates, {
    new: true,
    runValidators: true,
  }).populate("serviceProvider");

  if (!newShipment) {
    return next(new AppError(`Air Shipment Not Created!`, 500));
  }

  res.status(200).json({
    status: "success",
    message: `Air Shipment is updated successfully.`,
    data: newShipment,
  });
});

// ==========================================================

//! Delete Air Shipment by ID
export const deleteAirShipmentByID = deleteOne(AirShipment);
