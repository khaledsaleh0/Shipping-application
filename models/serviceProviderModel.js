import mongoose from "mongoose";
//* ============================================================

const serviceProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["air", "sea", "domestic"],
      required: true,
      lowercase: true,
      trim: true,
    },
    scope: {
      type: String,
      enum: ["plane", "express", "lcl", "fcl"],
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

//* =============================================

export default ServiceProvider;
