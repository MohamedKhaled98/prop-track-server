import { Request, Response, NextFunction } from "express";
import InquiryService from "../services/inquiry.service";
import LocationService from "../services/location.service";

class LocationController {
  protected service: LocationService;

  constructor() {
    this.service = new LocationService();
  }

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.query;
      const locations = await this.service.search(query as string);
      res.status(200).send(locations);
    } catch (error) {
      next(error);
    }
  };
}

export default LocationController;
