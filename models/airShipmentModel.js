import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);
//* ============================================================

const airShipmentItemSchema = new mongoose.Schema({
  itemWeight: {
    type: Number,
    required: true,
  },
  itemLength: {
    type: Number,
    required: true,
  },
  itemWidth: {
    type: Number,
    required: true,
  },
  itemHeight: {
    type: Number,
    required: true,
  },
});

const airShipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: Number,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shipmentType: {
      type: String,
      enum: ["plane", "express"],
      required: true,
      lowercase: true,
      trim: true,
    },
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    sellingCost: {
      type: Number,
      required: true,
    },
    blNum: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    items: [airShipmentItemSchema],

    invoiceStatus: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: String,
      trim: true,
    },
    spPaymentStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

airShipmentSchema.path("shipmentId").index({ unique: true });

airShipmentSchema.plugin(AutoIncrement, {
  id: "air_shipment_seq",
  inc_field: "shipmentId",
  disable_hooks: true,
});

const AirShipment = mongoose.model("AirShipment", airShipmentSchema);

//* =============================================

export default AirShipment;
