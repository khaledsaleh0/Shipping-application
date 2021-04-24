import { check } from "express-validator";
import mongoose from "mongoose";
import Customer from "../models/customerModel.js";
import SeaShipment from "../models/seaShipmentModel.js";
import AppError from "../utils/appError.js";
import { isValidUpdate } from "../utils/authUtils.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne } from "./factoryhandler.js";

//* ============================================================

//! Add new Customer
export const validateCustomer = [
  check("customerId", "Don't Provide Customer Id, it is automatically generated.").not().exists(),
  check("name", "Customer Name is required.").trim().exists().notEmpty(),
  check("email", "Customer Email is required.")
    .trim()
    .exists()
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage("Please include a valid Email."),
  check("phone", "Customer Phone number is required.").trim().exists().notEmpty(),
  check("companyName", "Customer Company Name is required.").trim().exists().notEmpty(),
];
export const addNewCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.create(req.body);

  if (customer) {
    // increment custom customerId
    customer.setNext("customer_seq", (err, customer) => {
      if (err) return next(new AppError(err, 500));

      res.status(201).json({
        status: "success",
        message: `New Customer is added successfully`,
        data: customer,
      });
    });
  }
});

// ==========================================================

//! Get all Customers
export const getAllCustomers = getAll(Customer);

// ==========================================================

//! Get Customer By ID
export const getCustomerByID = getOne(Customer);

// ==========================================================

//! Update Customer by ID
export const updateCustomerByID = catchAsync(async (req, res, next) => {
  if (
    !isValidUpdate(req.body, [
      "name",
      "email",
      "phone",
      "companyName",
      "address",
      "country",
      "city",
      "comment",
    ])
  ) {
    return next(new AppError("ERROR: Invalid Operation", 400));
  }

  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!customer) {
    return next(new AppError(`No Customers found with that ID`, 404));
  }

  res.status(200).json({
    status: "success",
    message: `Customer is updated successfully.`,
    data: customer,
  });
});

// ==========================================================

//! Delete Customer by ID
export const deleteCustomerByID = deleteOne(Customer);

// ==========================================================

//! Get Customer related Shipments
export const getAllCustomerRelatedShipments = catchAsync(async (req, res, next) => {
  const { customerId } = req.params;

  const validCustomer = await Customer.findById(customerId);
  if (!validCustomer) {
    return next(new AppError(`No Customers found with that ID`, 404));
  }

  const shipment = await Customer.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(customerId) } },
    {
      $lookup: {
        from: "seashipments",
        // localField: "_id",
        // foreignField: "customer",
        let: { the_customer: "$_id" }, //! localField
        pipeline: [
          { $match: { $expr: { $eq: ["$customer", "$$the_customer"] } } }, //! foreignField
          { $project: { shipmentId: 1, shipmentType: "sea", sellingCost: 1, _id: 0 } }, //! select fields
        ],
        as: "seaShipments",
      },
    },
    {
      $lookup: {
        from: "airshipments",
        let: { the_customer: "$_id" }, //! localField
        pipeline: [
          { $match: { $expr: { $eq: ["$customer", "$$the_customer"] } } }, //! foreignField
          { $project: { shipmentId: 1, shipmentType: "air", sellingCost: 1, _id: 0 } }, //! select fields
        ],
        as: "airShipments",
      },
    },
    {
      $project: {
        _id: 0,
        customer: {
          _id: "$_id",
          name: "$name",
          email: "$email",
          customerId: "$customerId",
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
