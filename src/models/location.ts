import mongoose, { Document, Schema } from "mongoose";

export interface LocationAttributes {
  id: number; // unique id
  level: number; // higherkey level
  path: string; // Materialized path 1.23.4554.33187
  pathName: {
    // Full path for bread crumbs [ 1.23.4554 ] "Dubai, Albarsha, Seko",
    en: string;
    ar: string;
  };
  name: {
    // location name
    en: string;
    ar: string;
  };
  type: string;
  slug: {
    en: string;
    ar: string;
  };
}

type LocationDocument = LocationAttributes & Document;

export const LocationSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    level: { type: Number },
    path: { type: String, unique: true },
    pathName: {
      en: { type: String, default: null },
      ar: { type: String, default: null },
    },
    name: {
      en: { type: String, required: true },
      ar: { type: String, default: null },
    },
    slug: {
      en: { type: String, required: true },
      ar: { type: String, default: null },
    },
    type: {
      type: String,
      required: true,
      enum: ["CITY", "COMMUNITY", "SUBCOMMUNITY", "TOWER"],
    },
  },
  { timestamps: false }
);
LocationSchema.index({ "name.en": 1, id: 1 });

const Location = mongoose.model<LocationDocument>("Location", LocationSchema);

export default Location;
