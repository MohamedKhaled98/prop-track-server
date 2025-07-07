import { ObjectId, Types } from "mongoose";
import Location from "../models/location";
import { query } from "winston";

class LocationService {
  async search(text?: string) {
    let filter = text ? { "name.en": { $regex: text, $options: "i" } } : {};

    const locations = await Location.find(filter).sort({ id: 1 }).limit(10);
    return locations;
  }
  async findById(id: Types.ObjectId | string) {
    let location = await Location.findById(id);
    return location;
  }
}

export default LocationService;
