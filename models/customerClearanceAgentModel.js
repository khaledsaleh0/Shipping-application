import mongoose from "mongoose";
//* ============================================================

const customerClearanceAgentSchema = new mongoose.Schema(
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

customerClearanceAgentSchema.path("name").index({ unique: true });

const CustomerClearanceAgent = mongoose.model(
  "CustomerClearanceAgent",
  customerClearanceAgentSchema
);

//* =============================================

export default CustomerClearanceAgent;
