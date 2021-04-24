import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);
//* ============================================================

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      lowercase: true,
      trim: true,
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

customerSchema.path("customerId").index({ unique: true });

customerSchema.plugin(AutoIncrement, {
  id: "customer_seq",
  inc_field: "customerId",
  disable_hooks: true,
});

const Customer = mongoose.model("Customer", customerSchema);

//* =============================================

export default Customer;
