import AirShipment from "../models/airShipmentModel.js";
import PaymentStatement from "../models/paymentStatementModel.js";
import SeaShipment from "../models/seaShipmentModel.js";
import catchAsync from "../utils/catchAsync.js";
import { createOne } from "./factoryhandler.js";
//* ==========================================================

//! Create New PaymentStatement
export const createNewPaymentStatement = catchAsync(async (req, res, next) => {
  const statement = await PaymentStatement.create(req.body);
  //! update spPaymentStatus for sea/air shipment as paid (service provider only)
  if (req.body.type === "sp") {
    if (req.body.shipType === "sea") {
      await SeaShipment.findByIdAndUpdate(req.body.shipMongoId, { spPaymentStatus: true });
    }
    if (req.body.shipType === "air") {
      await AirShipment.findByIdAndUpdate(req.body.shipMongoId, { spPaymentStatus: true });
    }
  }
  res.status(201).json({
    status: "success",
    message: `PaymentStatement is created Successfully`,
    data: statement,
  });
});

// ==========================================================

//! Get All Payment Statements
export const getAllPaymentStatements = catchAsync(async (req, res, next) => {
  const { vendorId } = req.params;
  const vendors = {
    customers: "customer",
    truckingAgents: "trucking",
    serviceProviders: "sp",
    customerClearanceAgents: "cc",
  };
  const vendor = req.originalUrl.split("/")[2];
  let query = {};
  if (vendorId) query = { type: vendors[vendor], "vendor._id": vendorId };

  const paymentStatements = await PaymentStatement.find(query).select("-createdAt -updatedAt -__v");
  res.status(200).json({
    status: "success",
    results: paymentStatements.length,
    data: paymentStatements,
  });
});
