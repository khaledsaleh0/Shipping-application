import mongoose from "mongoose";
//* ============================================================

const truckingAgentSchema = new mongoose.Schema(
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

truckingAgentSchema.path("name").index({ unique: true });

const TruckingAgent = mongoose.model("TruckingAgent", truckingAgentSchema);

//* =============================================

export default TruckingAgent;
