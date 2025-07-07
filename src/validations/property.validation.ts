import Joi from "joi";
const priceSchema = Joi.object({
  value: Joi.number().required(),
  currency: Joi.string().default("AED"),
  period: Joi.string().valid("monthly", "yearly").optional(),
});

const sizeSchema = Joi.object({
  value: Joi.number().required(),
  unit: Joi.string().default("sqft"),
});

export const createPropertySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  propertyType: Joi.string().required(),
  offeringType: Joi.string().valid("rent", "sale").required(),
  bathroomsValue: Joi.number().min(0).required(),
  bedroomsValue: Joi.number().min(0).required(),
  price: priceSchema.required(),
  size: sizeSchema.required(),
  locationRef: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, "invalid id")
    .required(),
  amenities: Joi.array().items(Joi.string()).default([]),
}).required();
