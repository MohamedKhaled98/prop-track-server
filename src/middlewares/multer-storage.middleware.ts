import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../utils/AppError";
import fs from "fs";
import sharp from "sharp";

const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image/")) {
    // req.fileValidationError = "Only image files are allowed!";
    return cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "only images are allowed!"
      )
    );
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB file size limit for original upload
  },
});

export const compressImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[] | undefined;

  if (!files || files.length === 0) {
    return next();
  }

  try {
    await Promise.all(
      files.map(async (file, i) => {
        let transformer = sharp(file.path);
        transformer = transformer.jpeg({ quality: 15 }).rotate();
        const compressedBuffer = await transformer.toBuffer();
        fs.writeFileSync(file.path, compressedBuffer);
      })
    );
    next();
  } catch (error) {
    throw new InternalServerError("Error processing images.");
  }
};
