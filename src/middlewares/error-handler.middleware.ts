import { NextFunction, Request, Response } from "express";
import { AppError, NotFoundError } from "../utils/AppError";
import logger from "../config/logger";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    logger.warn("Route not found:", {
        path: req.path,
        method: req.method,
    });
    next(new NotFoundError("Route not found"));
};


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {


    let message = err.message;

    if (err instanceof AppError) {
        logger.warn(err.message);
        res.status(err.statusCode).json({
            message,
        });
    } else {
        logger.error('Unexpected error!:', {
            name: err.name,
            message: message,
            stack: err.stack,
            method: req.method,
            url: req.originalUrl,
            timestamp: new Date().toISOString()
        });
        if (process.env.NODE_ENV === "production") {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!',
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: message,
                error: err,
                stack: err.stack,
            });
        }
    }


}
