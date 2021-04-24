import express from "express";
import { isUser } from "../controllers/authController.js";
import { getAllShipments } from "../controllers/allShipmentController.js";

const router = express.Router();
//* ============================================================

// /api/allShipments

router.use(isUser);

router
  .route("/")
  // @route     GET /api/allShipments
  // @desc      Get All Shipments (Air/Sea)
  // @access    Private
  .get(getAllShipments);

//* =============================================

export default router;
