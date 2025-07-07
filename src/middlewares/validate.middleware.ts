import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { BadRequest } from "../utils/AppError";

export const validate =
  (schema: Joi.ObjectSchema<any>, validateQuery: boolean = false) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(validateQuery ? req.query : req.body, { abortEarly: true });
    if (error) next(new BadRequest(error.details?.[0].message));
    next();
  };
