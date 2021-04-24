import mongoose from "mongoose";
//* ============================================================

const shipmentTypeSchema = new mongoose.Schema(
  {
    shipmentType: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    collection: "shipmentTypes",
    timestamps: true,
  }
);

shipmentTypeSchema.path("shipmentType").index({ unique: true });

const ShipmentType = mongoose.model("ShipmentType", shipmentTypeSchema);

//* =============================================

export default ShipmentType;
