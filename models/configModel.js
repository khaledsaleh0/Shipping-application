import mongoose from "mongoose";

//* ============================================================

const configSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide Application Name"],
    },
    appLogo: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

const Config = mongoose.model("Config", configSchema);

//* =============================================

export default Config;
