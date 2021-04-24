import _merge from "lodash/merge.js";
import Shipment from "../models/shipmentModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne } from "./factoryhandler.js";

//* ==========================================================

//! Get All Shipments
export const getAllShipments = getAll(Shipment);

// ==========================================================

//! Add New Shipment
export const addNewShipment = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.create(req.body);

  if (shipment) {
    // increment custom shipmentId
    shipment.setNext("shipment_seq", (err, shipment) => {
      if (err) return next(new AppError(err, 500));

      res.status(201).json({
        status: "success",
        message: `New Shipment is created successfully`,
        data: shipment,
      });
    });
  }
});

// ==========================================================

//! Get Shipment by ID
export const getShipmentByID = getOne(Shipment);

// ==========================================================

//! Update Shipment by ID
export const updateShipmentByID = catchAsync(async (req, res, next) => {
  const oldShipment = await Shipment.findById(req.params.id).lean();
  if (!oldShipment) {
    return next(new AppError(`No Shipment found with that ID`, 404));
  }

  delete oldShipment.items;

  const shipmentUpdates = _merge({}, oldShipment, req.body);
  const newShipment = await Shipment.findByIdAndUpdate(oldShipment._id, shipmentUpdates, {
    new: true,
    runValidators: true,
  });

  if (!newShipment) {
    return next(new AppError(`Shipment Not Created!`, 500));
  }

  res.status(200).json({
    status: "success",
    message: `Shipment is updated successfully.`,
    data: newShipment,
  });
});

// ==========================================================

//! Delete Shipment by ID
export const deleteShipmentByID = deleteOne(Shipment);

// ==========================================================

//! Get Shipment Item by ID
export const getShipmentItemByID = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.findById(req.params.shipmentId);

  if (!shipment) {
    return next(new AppError(`No Shippment found with that ID`, 404));
  }

  const shipmentItem = shipment.items.find((item) => {
    return item._id.toString() === req.params.shipmentItemId;
  });

  if (!shipmentItem) {
    return next(
      new AppError(`No Shippment Item found with that ID in Shipment ${shipment._id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: shipmentItem,
  });
});
