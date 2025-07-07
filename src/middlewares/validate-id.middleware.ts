import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateId = async (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send("Invalid ID.");
  } else {
    next();
  }
};
