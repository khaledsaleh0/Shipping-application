import { check } from "express-validator";
import Config from "../models/configModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import sharp from "sharp";

//* ============================================================

//! Get All Site Configurations
export const getConfigs = catchAsync(async (req, res, next) => {
  const configs = await Config.findOne().lean();

  if (!configs) {
    return res.status(202).json({
      status: "warning",
      message: "Site Configurations are not yet set by Admin.",
    });
    // next(
    //   new AppError("Site Configurations are not yet set by Admin.", 404)
    // );
  }

  res.status(200).json({
    status: "success",
    data: configs,
  });
});

// ==========================================================

//! Create Config Collection - only once
export const validateConfigs = [
  check("appName", "App Name is required.").trim().exists().notEmpty(),
];
export const updateConfigs = catchAsync(async (req, res, next) => {
  const oldConfigDoc = await Config.findOne().lean();
  const newConfigDoc = await Config.findOneAndUpdate({}, req.body, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true, // apply schema defaults if new doc created
    runValidators: true,
  });

  if (req.file && newConfigDoc) {
    const logoBuffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .toFormat("jpeg")
      // .jpeg({ quality: 50 })
      .toBuffer();
    newConfigDoc.appLogo = logoBuffer;
    await newConfigDoc.save();
  }

  res.status(newConfigDoc ? 201 : 200).json({
    status: "success",
    message: `System Configurations are ${oldConfigDoc ? "updated" : "created"} successfully`,
    data: newConfigDoc.toObject(),
  });
});

// ==========================================================

//! Get Site Logo
export const getSiteLogo = catchAsync(async (req, res, next) => {
  const configs = await Config.findOne();

  if (!configs) {
    return next(new AppError("Site Configurations are not yet set by Admin.", 404));
  }
  if (!configs.appLogo) {
    return next(new AppError("Site Logo are not yet set by Admin.", 404));
  }
  res.set("Content-Type", "image/jpeg");
  res.status(200).send(configs.appLogo);
});
