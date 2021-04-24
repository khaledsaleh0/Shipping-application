import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);
//* ============================================================

const seaShipmentItemSchema = new mongoose.Schema({
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
  packagesNum: {
    type: Number,
    required: true,
  },
});

const seaShipmentSchema = new mongoose.Schema(
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
      enum: ["lcl", "fcl"],
      required: true,
      lowercase: true,
      trim: true,
    },
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
    costEgp: {
      type: Number,
      required: true,
    },
    costUsd: {
      type: Number,
      required: true,
    },
    costEur: {
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
    truckingCost: {
      type: Number,
      required: true,
    },
    truckingAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TruckingAgent",
      required: true,
    },
    customerClearance: {
      type: Number,
      required: true,
    },
    customerClearanceAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerClearanceAgent",
      required: true,
    },
    pol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Port",
      required: true,
    },
    pod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Port",
      required: true,
    },
    items: [seaShipmentItemSchema],

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

    //! for FCL Shipment type
    containerNum: {
      type: Number,
    },
    containerType: {
      type: String,
      enum: ["20dc", "40dc", "20rf", "40rf"],
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

seaShipmentSchema.path("shipmentId").index({ unique: true });

seaShipmentSchema.plugin(AutoIncrement, {
  id: "sea_shipment_seq",
  inc_field: "shipmentId",
  disable_hooks: true,
});

const SeaShipment = mongoose.model("SeaShipment", seaShipmentSchema);

//* =============================================

export default SeaShipment;
