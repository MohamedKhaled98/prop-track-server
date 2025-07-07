import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../utils/AppError";
import PropertyService from "../services/property.service";

class PropertyController {
  protected service: PropertyService;

  constructor() {
    this.service = new PropertyService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];

      const propertyData = {
        ...req.body,
        agent: req.agentId!,
        images: files?.map((file) => file.path),
      };

      const property = await this.service.create(propertyData);
      res.status(201).send(property);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];

      const propertyData = {
        ...req.body,
        agent: req.agentId!,
        images: files?.map((file) => file.path),
      };

      const property = await this.service.update(req.params.id, propertyData);

      res.status(200).send(property);
    } catch (error) {
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const property = await this.service.delete(req.params.id);
      res.status(200).send(property);
    } catch (error) {
      next(error);
    }
  };

  archive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const property = await this.service.archive(req.params.id);
      res.status(200).send(property);
    } catch (error) {
      next(error);
    }
  };

  publish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const property = await this.service.publish(req.params.id);
      res.status(200).send(property);
    } catch (error) {
      next(error);
    }
  };
}

export default PropertyController;
