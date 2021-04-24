import mongoose from "mongoose";
//* ============================================================

const paymentStatementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["trucking", "cc", "sp", "customer"],
      required: true,
      lowercase: true,
      trim: true,
    },
    vendor: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    amount: {
      type: Number,
      required: true,
    },
    amountUsd: {
      type: Number,
    },
    amountEur: {
      type: Number,
    },
    shipmentId: {
      type: Number,
    },
  },
  {
    collection: "paymentStatements",
    timestamps: true,
  }
);

const PaymentStatement = mongoose.model("PaymentStatement", paymentStatementSchema);

//* =============================================

export default PaymentStatement;
