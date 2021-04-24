import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  addPorts,
  deletePortByID,
  getAllPorts,
  getPortByID,
  updatePortByID,
  validatePort,
} from "../controllers/portController.js";
import { validateRequest } from "../utils/authUtils.js";

const router = express.Router();

//* ============================================================

// /api/ports

router.use(isUser);

router
  .route("/")
  // @route     GET /api/ports
  // @desc      Get All Ports
  // @access    Private
  .get(getAllPorts)

  // @route     POST /api/ports
  // @desc      Add New Port
  // @access    Private
  .post(validatePort, validateRequest, addPorts);

router
  .route("/:id")
  // @route     GET /api/ports/:id
  // @desc      Get Port by ID
  // @access    Private
  .get(getPortByID)

  // @route     POST /api/ports/:id
  // @desc      Update Port by ID
  // @access    Private
  .patch(validatePort, validateRequest, updatePortByID)

  // @route     DELETE /api/ports/:id
  // @desc      Delete Port by ID
  // @access    Private
  .delete(deletePortByID);

//* =============================================

export default router;
