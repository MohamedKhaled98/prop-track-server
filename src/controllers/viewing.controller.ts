import { Request, Response, NextFunction } from "express";
import ViewingService from "../services/viewing.service";

class ViewingController {
  protected service: ViewingService;

  constructor() {
    this.service = new ViewingService();
  }

  scheduleViewing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const viewing = await this.service.scheduleViewing(req.agentId!, req.body);
      res.status(201).send(viewing);
    } catch (error) {
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const viewing = await this.service.update(req.params.id, req.body);
      res.status(200).send(viewing);
    } catch (error) {
      next(error);
    }
  };
}

export default ViewingController;
