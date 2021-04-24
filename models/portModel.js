import mongoose from "mongoose";
//* ============================================================

const portSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

portSchema.path("name").index({ unique: true });

const Port = mongoose.model("Port", portSchema);

//* =============================================

export default Port;
