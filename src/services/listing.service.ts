import { isBoolean, isEmpty, isString, toInteger } from "lodash";
import { SearchFilter } from "../@types";
import Property from "../models/property";
import { NotFoundError } from "../utils/AppError";
import LocationService from "./location.service";

class ListingService {
  protected locationService: LocationService;

  constructor() {
    this.locationService = new LocationService();
  }

  async list(filters: SearchFilter = {}) {
    const { page = 1, limit = 10 } = filters;

    const pipeline = this.buildQuery(filters, true);
    const [response] = await Property.aggregate(pipeline);

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

  async findById(id: string) {
    const property = await Property.findById(id);
    if (!property) throw new NotFoundError("Property not found");
    return property;
  }

  private buildQuery(filters: SearchFilter = {}, includePagination?: boolean) {
    const { filter = {}, page = 1, limit = 10 } = filters;

    const pipeline = [];
    const match: any = {};

    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        if ((isString(value) && value.length > 0) || isBoolean(value) || Boolean(value)) {
          switch (key) {
            case "location":
              match["location.path"] = { $regex: `^${value}` };
              break;
            case "propertyType":
              match["propertyType"] = value;
              break;
            case "offeringType":
              match["offeringType"] = value;
              break;
            case "bathroomsValue":
              if (!isEmpty(value)) match["bathroomsValue"] = { $in: value };
              break;
            case "bedroomsValue":
              if (!isEmpty(value)) match["bedroomsValue"] = { $in: value };
              break;
            case "price":
              if (typeof value === "object" && value !== null) {
                const { value: priceValue, period } = value as any;

                if (!isNaN(Number(priceValue))) {
                  match["price.value"] = { $lte: Number(priceValue) };
                }

                if (period === "monthly" || period === "yearly") {
                  match["price.period"] = period;
                }
              }
              break;
            case "size":
              match["size.value"] = { $lte: Number(value) };
              break;
            case "amenities":
              if (!isEmpty(value)) match["amenities"] = { $in: value };
              break;
            default:
              break;
          }
        }
      }
      pipeline.push({ $match: match });
    }

    pipeline.push({
      $lookup: {
        from: "agents",
        localField: "agent",
        foreignField: "_id",
        as: "agent",
      },
    });
    pipeline.push({
      $unwind: {
        path: "$agent",
        preserveNullAndEmptyArrays: true,
      },
    });
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

export default ListingService;
