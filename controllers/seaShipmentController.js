import SeaShipment from "../models/seaShipmentModel.js";
import _merge from "lodash/merge.js";
import Customer from "../models/customerModel.js";
import ServiceProvider from "../models/serviceProviderModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne } from "./factoryhandler.js";
import TruckingAgent from "../models/truckingAgentModel.js";
import CustomerClearanceAgent from "../models/customerClearanceAgentModel.js";
import Port from "../models/portModel.js";

//* ==========================================================

const populatedDocs = [
  { path: "customer", select: "name email" },
  { path: "serviceProvider", select: "name type scope" },
  { path: "truckingAgent", select: "name" },
  { path: "customerClearanceAgent", select: "name" },
  { path: "pol", select: "name" },
  { path: "pod", select: "name" },
];

//! Get All Sea Shipments
export const getAllSeaShipments = getAll(SeaShipment, populatedDocs);

// ==========================================================

//! Add New Sea Shipment
export const addSeaShipment = catchAsync(async (req, res, next) => {
  const {
    serviceProvider,
    shipmentType,
    customer,
    truckingAgent,
    customerClearanceAgent,
    pol,
    pod,
  } = req.body;
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
    return next(
      new AppError(`Not Valid Service Provider or not found, Please Provide a Valid one.`, 404)
    );
  }
  // validate Trucking Agent
  const validTruckingAgent = await TruckingAgent.findById(truckingAgent);
  if (!validTruckingAgent) {
    return next(
      new AppError(`Not Valid Trucking Agent or not found, Please Provide a Valid one.`, 404)
    );
  }
  // validate Customer Clearance Agent
  const validCustomerClearanceAgent = await CustomerClearanceAgent.findById(customerClearanceAgent);
  if (!validCustomerClearanceAgent) {
    return next(
      new AppError(
        `Not Valid Customer Clearance Agent or not found, Please Provide a Valid one.`,
        404
      )
    );
  }
  // validate pol
  const validPol = await Port.findById(pol);
  if (!validPol) {
    return next(new AppError(`Not Valid POL or not found, Please Provide a Valid one.`, 404));
  }
  // validate pod
  const validPod = await Port.findById(pod);
  if (!validPod) {
    return next(new AppError(`Not Valid POD or not found, Please Provide a Valid one.`, 404));
  }

  // create sea shipment
  const shipment = await SeaShipment.create(req.body);

  if (shipment) {
    // increment custom shipmentId
    shipment.setNext("sea_shipment_seq", (err, shipment) => {
      if (err) return next(new AppError(err, 500));

      res.status(201).json({
        status: "success",
        message: `New Sea Shipment is created successfully`,
        data: shipment,
      });
    });
  }
});

// ==========================================================

//! Get Sea Shipment by ID
export const getSeaShipmentByID = getOne(SeaShipment, populatedDocs);

// ==========================================================

//! Update Sea Shipment by ID
export const updateSeaShipmentByID = catchAsync(async (req, res, next) => {
  const oldShipment = await SeaShipment.findById(req.params.id).lean();
  if (!oldShipment) {
    return next(new AppError(`No Sea Shipment found with that ID`, 404));
  }

  const {
    serviceProvider,
    shipmentType,
    truckingAgent,
    customerClearanceAgent,
    pol,
    pod,
  } = req.body;

  // validate Service Provider
  if (
    (serviceProvider && serviceProvider != oldShipment.serviceProvider) ||
    (shipmentType && shipmentType != oldShipment.shipmentType)
  ) {
    const validServiceProvider = await ServiceProvider.findOne({
      _id: serviceProvider,
      scope: shipmentType,
    });
    if (!validServiceProvider) {
      return next(
        new AppError(
          `Not Valid Service Provider or Shipment Type, Please Provide Matched Data.`,
          404
        )
      );
    }
  }
  // validate Trucking Agent
  if (truckingAgent && truckingAgent != oldShipment.truckingAgent) {
    const validTruckingAgent = await TruckingAgent.findById(truckingAgent);
    if (!validTruckingAgent) {
      return next(
        new AppError(`Not Valid Trucking Agent or not found, Please Provide a Valid one.`, 404)
      );
    }
  }
  // validate Customer Clearance Agent
  if (customerClearanceAgent && customerClearanceAgent != oldShipment.customerClearanceAgent) {
    const validCustomerClearanceAgent = await CustomerClearanceAgent.findById(
      customerClearanceAgent
    );
    if (!validCustomerClearanceAgent) {
      return next(
        new AppError(
          `Not Valid Customer Clearance Agent or not found, Please Provide a Valid one.`,
          404
        )
      );
    }
  }
  // validate pol
  if (pol && pol != oldShipment.pol) {
    const validPol = await Port.findById(pol);
    if (!validPol) {
      return next(new AppError(`Not Valid POL or not found, Please Provide a Valid one.`, 404));
    }
  }

  if (pod && pod != oldShipment.pod) {
    // validate pod
    const validPod = await Port.findById(pod);
    if (!validPod) {
      return next(new AppError(`Not Valid POD or not found, Please Provide a Valid one.`, 404));
    }
  }

  delete oldShipment.items;

  const shipmentUpdates = _merge({}, oldShipment, req.body);

  const newShipment = await SeaShipment.findByIdAndUpdate(oldShipment._id, shipmentUpdates, {
    new: true,
    runValidators: true,
  }).populate(populatedDocs);

  if (!newShipment) {
    return next(new AppError(`Sea Shipment Not Created!`, 500));
  }

  res.status(200).json({
    status: "success",
    message: `Sea Shipment is updated successfully.`,
    data: newShipment,
  });
});

// ==========================================================

//! Delete Sea Shipment by ID
export const deleteSeaShipmentByID = deleteOne(SeaShipment);
