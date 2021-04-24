import multer from "multer";
import AppError from "./appError.js";
//* ==========================================================

//! Multer Utils.
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please Upload Only Images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 4 * 1024 * 1024, // 4 Mb
  },
});

//* ==========================================================

//! Upload Single Image
export const uploadImage = upload.single("appLogo");
