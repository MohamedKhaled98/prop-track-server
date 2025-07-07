import { Request, Response, NextFunction } from "express";
import InquiryService from "../services/inquiry.service";

class InquiryController {
  protected service: InquiryService;

  constructor() {
    this.service = new InquiryService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.create(req.body);
      res.status(201).send({ message: "Inquiry has been submited successfully!" });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inquiries = await this.service.list(req.query);
      res.status(200).send(inquiries);
    } catch (error) {
      next(error);
    }
  };
}

export default InquiryController;
