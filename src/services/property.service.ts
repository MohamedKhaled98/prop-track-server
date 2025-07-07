import Property from "../models/property";
import { PropertyAttributes } from "../models/property";
import { BadRequest, NotFoundError } from "../utils/AppError";
import LocationService from "./location.service";
import { pick } from "lodash";

class PropertyService {
  protected locationService: LocationService;

  constructor() {
    this.locationService = new LocationService();
  }

  async findById(id: string) {
    let property = await Property.findById(id);
    return property;
  }

  async create(data: PropertyAttributes) {
    if (!data.images || data.images.length < 1) throw new BadRequest("You must upload at least 1 images.");

    const location = await this.locationService.findById(data.locationRef);
    if (!location) throw new BadRequest("Location not found");

    data.location = pick(location, ["path", "pathName", "name"]); //HYBIRD

    let property = await Property.create(data);
    return property;
  }

  async update(id: string, data: PropertyAttributes) {
    if (!data.images || data.images.length < 1) throw new BadRequest("You must upload at least 1 images.");

    let property = await Property.findById(id);
    if (!property) throw new NotFoundError("Property not found");

    if (data.locationRef != property.locationRef) {
      const location = await this.locationService.findById(data.locationRef);
      if (!location) throw new BadRequest("Location not found");
      data.location = pick(location, ["path", "pathName", "name"]);
    }

    Object.assign(property, data);
    await property.save();

    return property;
  }

  async delete(id: string) {
    let property = await Property.findByIdAndDelete(id);
    if (!property) throw new NotFoundError("Property not found");
    return property;
  }

  async archive(id: string) {
    let property = await Property.findByIdAndUpdate(id, { published: false }, { new: true });
    if (!property) throw new NotFoundError("Property not found");
    return property;
  }

  async publish(id: string) {
    let property = await Property.findById(id);
    if (!property) throw new NotFoundError("Property not found");

    if (property.published) throw new BadRequest("Property is already published");

    property.published = true;
    property.publishedDate = new Date();

    await property.save();
    return property;
  }
}

export default PropertyService;
