import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);
//* ============================================================

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: Number,
      unique: true,
    },
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "not-paid",
    },
    paymentMethod: {
      type: String,
      default: "cash",
    },
    paymentAmount: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.path("invoiceId").index({ unique: true });

invoiceSchema.plugin(AutoIncrement, {
  id: "invoice_seq",
  inc_field: "invoiceId",
  disable_hooks: true,
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

//* =============================================

export default Invoice;
