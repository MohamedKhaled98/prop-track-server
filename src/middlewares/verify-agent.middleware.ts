import { Request, Response, NextFunction } from "express";
import { Agent } from "../models/agent";
import { UnauthorizedError } from "../utils/AppError";
import mongoose from "mongoose";

export const verifyAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agentId = req.headers?.["x-agent-id"];
    const agent = await Agent.findById(agentId);

    if (!agent) throw new UnauthorizedError();

    req.agentId = agentId as string;
    next();
  } catch (error) {
    throw new UnauthorizedError();
  }
};
