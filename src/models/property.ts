import mongoose, { Document, Schema, Types } from "mongoose";
import { LocationAttributes } from "./location";

export interface Price {
  value: number;
  period: "monthly" | "yearly";
}

interface Size {
  value: number;
  unit: string;
}

export interface PropertyAttributes {
  title: string;
  description?: string;
  propertyType: "string";
  offeringType: "rent" | "sale";
  bathroomsValue: number;
  bedroomsValue: number;
  price: Price;
  size: Size;
  locationRef: string;
  location: Omit<LocationAttributes, "level" | "type" | "slug" | "id">;
  images: string[];
  amenities: string[];
  agent: string;
  published: boolean;
  publishedDate: Date;
}

const PriceSchema = new Schema<Price>(
  {
    value: { type: Number, required: true },
    period: { type: String, enum: ["monthly", "yearly"], required: true },
  },
  { _id: false }
);

const SizeSchema = new Schema<Size>(
  {
    value: { type: Number, required: true },
    unit: { type: String, default: "sqft" },
  },
  { _id: false }
);

type PropertyDoc = PropertyAttributes & Document;

const PropertySchema = new Schema(
  {
    title: { type: String, required: true },
    propertyType: { type: String, required: true },
    offeringType: { type: String, enum: ["rent", "sale"], required: true },
    bathroomsValue: { type: Number, default: 0 },
    bedroomsValue: { type: Number, default: 0 },
    price: { type: PriceSchema, required: true },
    size: { type: SizeSchema, required: true },
    locationRef: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    location: {
      path: String,
      name: {
        en: String,
        ar: String,
      },
      pathName: {
        en: String,
        ar: String,
      },
    },
    images: [{ type: String }],
    description: { type: String },
    amenities: [{ type: String }],
    agent: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    published: { type: Boolean, default: false },
    publishedDate: { type: Date, default: null },
  },
  { timestamps: true }
);
PropertySchema.index({ offeringType: 1, "location.path": 1, propertyType: 1 });
PropertySchema.index({ agent: 1 });

const Property = mongoose.model<PropertyDoc>("Property", PropertySchema);

export default Property;
