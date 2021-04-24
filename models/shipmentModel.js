import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);
//* ============================================================

const shipmentItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  itemDetails: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
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
  deliveryCost: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
    required: true,
  },
  shipmentType: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  packagingType: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  packagingCost: {
    type: Number,
    required: true,
  },
});

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: Number,
      unique: true,
    },
    from: {
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
      },
      customerName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      contactPerson: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      customerEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      customerPhone: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      dateOfCollection: {
        type: Date,
        required: true,
        default: Date.now(), //! to be deleted
      },
    },
    to: {
      contactPerson: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      dateOfDelivery: {
        type: Date,
        required: true,
        default: Date.now(), //! to be deleted
      },
    },

    items: [shipmentItemSchema],

    invoiceStatus: {
      type: Boolean,
      default: false,
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

shipmentSchema.path("shipmentId").index({ unique: true });

shipmentSchema.plugin(AutoIncrement, {
  id: "shipment_seq",
  inc_field: "shipmentId",
  disable_hooks: true,
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

//* =============================================

export default Shipment;

// [
//   {
//     "shipmentId": 1,
//     "cost": 20,
//     "from": {
//       "customerId": 1,
//       "customerName": "mostafa"
//     },
//     "to": {
//       "customerId": 1,
//       "customerName": "ali"
//     },

//   },
//   {
//     "shipmentId": 2,
//     "cost": 15,
//     "from": {
//       "customerId": 2,
//       "customerName": "sherif"
//     },
//     "to": {
//       "customerId": 1,
//       "customerName": "ali"
//     },

//   },
//   {
//     "shipmentId": 4,
//     "cost": 50,
//     "from": {
//       "customerId": 2,
//       "customerName": "sherif"
//     },
//     "to": {
//       "customerId": 1,
//       "customerName": "ali"
//     },

//   },
//   {
//     "shipmentId": 3,
//     "cost": 10,
//     "from": {
//       "customerId": 1,
//       "customerName": "mostafa"
//     },
//     "to": {
//       "customerId": 1,
//       "customerName": "ali"
//     },

//   },

// ]

// db.collection.aggregate([
//   {
//     $group: {
//       _id: {
//         _id: "$from.customerId",
//         name: "$from.customerName",

//       },
//       shipmentsAmount: {
//         "$sum": "$cost"
//       },
//       shipmentsNumber: {
//         $sum: 1
//       }
//     }
//   }
// ])

// [
//   {
//     "_id": {
//       "_id": 2,
//       "name": "sherif"
//     },
//     "shipmentsAmount": 65,
//     "shipmentsNumber": 2
//   },
//   {
//     "_id": {
//       "_id": 1,
//       "name": "mostafa"
//     },
//     "shipmentsAmount": 30,
//     "shipmentsNumber": 2
//   }
// ]
