import mongoose from "mongoose";
//* ============================================================

const packagingTypeSchema = new mongoose.Schema(
  {
    packagingType: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    collection: "packagingTypes",
    timestamps: true,
  }
);

packagingTypeSchema.path("packagingType").index({ unique: true });

const PackagingType = mongoose.model("PackagingType", packagingTypeSchema);

//* =============================================

export default PackagingType;
