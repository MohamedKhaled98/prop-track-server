import { isBoolean, isEmpty, isString } from "lodash";
import { SearchFilter } from "../@types";
import { InquiryDto } from "../dto/inquiry.dto";
import Inquiry, { InquiryAttributes } from "../models/inquiry";
import { ContactService } from "./contact.service";
import PropertyService from "./property.service";

class InquiryService {
  private contactService;
  private propertyService;

  constructor() {
    this.contactService = new ContactService();
    this.propertyService = new PropertyService();
  }

  async create(data: InquiryDto) {
    const { fullName, email, propertyOfInterest, message } = data;

    let contact = await this.contactService.findByEmail(email);
    const property = await this.propertyService.findById(propertyOfInterest);

    if (contact) {
      if (property && !contact.interestedProperties.includes(propertyOfInterest)) {
        contact.interestedProperties.push(propertyOfInterest);
        await contact.save();
      }
    } else {
      contact = await this.contactService.create({
        fullName,
        email,
        interestedProperties: property ? [propertyOfInterest] : [],
        assignedAgentId: property?.agent?.toString(),
      });
    }
    const inquiry = await Inquiry.create({
      contactId: contact._id,
      propertyId: propertyOfInterest,
      message,
      agentId: property?.agent,
    });

    return inquiry;
  }

  async list(filters: SearchFilter = {}) {
    const { page = 1, limit = 10 } = filters;

    const pipeline = this.buildQuery(filters, true);
    const [response] = await Inquiry.aggregate(pipeline);

    const data = response?.data ?? [];
    const total = response?.total?.[0]?.count ?? 0;

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private buildQuery(filters: SearchFilter, includePagination?: boolean) {
    const { filter = {}, page = 1, limit = 10 } = filters;

    const pipeline = [];
    const match: any = {};

    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        if ((isString(value) && value.length > 0) || isBoolean(value) || Boolean(value)) {
          switch (key) {
            case "agentId":
              match["agentId"] = value;
              break;
            default:
              break;
          }
        }
      }
      pipeline.push({ $match: match });
    }

    if (includePagination) {
      const skip = (page - 1) * limit;
      pipeline.push({
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: "count" }],
        },
      });
    }
    return pipeline;
  }
}

export default InquiryService;
