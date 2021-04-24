import express from "express";
import { isUser } from "../controllers/authController.js";
import {
  getConfigs,
  getSiteLogo,
  updateConfigs,
  validateConfigs,
} from "../controllers/configController.js";
import { validateRequest } from "../utils/authUtils.js";
import { uploadImage } from "../utils/imageProcessing.js";

const router = express.Router();
//* ============================================================

// /api/configs

router.use(isUser);

router
  .route("/")
  // @route     GET /api/configs
  // @desc      Get System Confiurations
  // @access    Private
  .get(getConfigs)
  // @route     POST /api/configs
  // @desc      Set System Confiurations
  // @access    Private
  .post(uploadImage, validateConfigs, validateRequest, updateConfigs);

router
  .route("/appLogo")
  // @route     GET /api/configs/appLogo
  // @desc      Get Site Logo
  // @access    Private
  .get(getSiteLogo);

//* =============================================

export default router;
