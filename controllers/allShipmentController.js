import AirShipment from "../models/airShipmentModel.js";
import SeaShipment from "../models/seaShipmentModel.js";
import catchAsync from "../utils/catchAsync.js";

//! Get All Shipments Costs
export const getAllShipments = catchAsync(async (req, res, next) => {
  const airShipments = await AirShipment.aggregate([
    {
      $project: {
        shipmentId: 1,
        shipmentType: "air",
        cost: 1,
        sellingCost: 1,
      },
    },
  ]);
  const seaShipments = await SeaShipment.aggregate([
    {
      $project: {
        shipmentId: 1,
        shipmentType: "sea",
        sellingCost: 1,
        costEgp: 1,
        costUsd: 1,
        costEur: 1,
        truckingCost: 1,
        customerClearance: 1,
      },
    },
  ]);

  const allShipments = seaShipments.concat(airShipments);

  res.status(200).json({
    status: "success",
    results: allShipments.length,
    data: allShipments,
  });
});
