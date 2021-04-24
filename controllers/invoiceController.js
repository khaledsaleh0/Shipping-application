import _merge from "lodash/merge.js";
import Invoice from "../models/invoiceModel.js";
import Shipment from "../models/shipmentModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import { isValidUpdate } from "../utils/authUtils.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getOne } from "./factoryhandler.js";

//* ==========================================================

//! Get All Invoices
export const getAllInvoices = catchAsync(async (req, res, next) => {
  let query;

  /**
   *  Get shipment related invoices
   *  route /api/shipments/:shipmentId/invoices
   */
  if (req.params.shipmentId) {
    const shipment = await Shipment.findById(req.params.shipmentId);
    if (!shipment) return next(new AppError(`No Shipment found with that ID`, 404));

    query = Invoice.findOne({ shipment: shipment._id }).populate("shipment");
  } else {
    /**
     * Get All System invoices
     * route /api/invoices
     */
    query = Invoice.find().populate("shipment");
  }

  // EXECUTE QUERY
  // const features = new APIFeatures(query, req.query).filter().sort().limitFields().paginate();
  // const invoices = await features.query;

  const invoices = await query;

  res.status(200).json({
    status: "success",
    results: invoices.length,
    data: invoices,
  });
});
// ==========================================================

//! Add New Invoice
export const addNewInvoice = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.findById(req.params.shipmentId);
  if (!shipment) return next(new AppError(`No Shipment found with that ID`, 404));

  const invoice = await Invoice.create({ shipment: shipment._id });

  if (invoice) {
    // update related Shipment's invoiceStatus to Created (true)
    shipment.invoiceStatus = true;
    await shipment.save();

    // increment custom invoiceId
    invoice.setNext("invoice_seq", (err, invoice) => {
      if (err) return next(new AppError(err, 500));

      res.status(201).json({
        status: "success",
        message: `New Invoice is created successfully`,
        data: invoice,
      });
    });
  }
});

// ==========================================================

//! Get Invoice by ID
export const getInvoiceByID = getOne(Invoice, "shipment");

// ==========================================================

//! Update Invoice by ID
export const updateInvoiceByID = catchAsync(async (req, res, next) => {
  if (!isValidUpdate(req.body, ["paymentStatus", "paymentMethod", "paymentAmount"])) {
    return next(new AppError("ERROR: Invalid Operation", 400));
  }

  const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("shipment");

  if (!invoice) {
    return next(new AppError(`No Invoices found with that ID`, 404));
  }

  res.status(201).json({
    status: "success",
    message: `Invoice is updated successfully`,
    data: invoice,
  });
});

// ==========================================================

//! Delete Invoice by ID
export const deleteInvoiceByID = deleteOne(Invoice);
