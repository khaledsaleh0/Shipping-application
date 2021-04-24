import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

//* ============================================================

//! UTILS.
const getDocumentName = (model) => {
  const { collectionName } = model.collection;
  return collectionName.substring(0, collectionName.length - 1);
};

//*============================================

//! Get All Documents
export const getAll = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const filter = {};

    let query = Model.find(filter);
    if (populateOptions) query = query.populate(populateOptions);

    // EXECUTE QUERY
    const features = new APIFeatures(query, req.query).filter().sort().limitFields().paginate();

    // const docs = await features.query.explain();
    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      // JSEND json formatting
      status: "success",
      results: docs.length,
      data: docs,
    });
  });

// ==========================================================

//! Get Document
export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No ${Model.collection.collectionName} found with that ID`, 404));
    }

    res.status(200).json({
      // JSEND json formatting
      status: "success",
      data: doc,
    });
  });

// ==========================================================

//! Delete Document
export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${Model.collection.collectionName} found with that ID`, 404));
    }

    res.status(202).json({
      status: "success",
      message: `${doc.constructor.modelName} is deleted Successfully`,
      data: null,
    });
  });

// ==========================================================

//! Update Document
export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No ${Model.collection.collectionName} found with that ID`, 404));
    }

    res.status(200).json({
      status: "success",
      message: `${doc.constructor.modelName} is updated Successfully`,
      data: doc,
    });
  });

// ==========================================================

//! Create Document
export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      message: `${doc.constructor.modelName} is created Successfully`,
      data: doc,
    });
  });
