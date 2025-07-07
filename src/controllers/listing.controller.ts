import { Request, Response, NextFunction } from "express";
import PropertyService from "../services/property.service";
import ListingService from "../services/listing.service";

class ListingController {
  protected service: ListingService;

  constructor() {
    this.service = new ListingService();
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const listings = await this.service.list(req.body);
      res.status(200).send(listings);
    } catch (error) {
      next(error);
    }
  };
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const listing = await this.service.findById(req.params.id);
      res.status(200).send(listing);
    } catch (error) {
      next(error);
    }
  };
}

export default ListingController;
