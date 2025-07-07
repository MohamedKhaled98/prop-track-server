import { Request, Response, NextFunction } from "express";
import AgentService from "../services/agent.service";

class AgentController {
  protected service: AgentService;

  constructor() {
    this.service = new AgentService();
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agent = await this.service.signup(req.body);
      res.status(201).send(agent);
    } catch (error) {
      next(error);
    }
  };
}

export default AgentController;
