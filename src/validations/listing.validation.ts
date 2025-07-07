import Joi from "joi";

export const listingFiltersSchema = Joi.object({
  filter: Joi.object({
    propertyType: Joi.string().valid("apartment", "villa").optional(),
    offeringType: Joi.string().valid("rent", "sale").optional(),
    bathroomsValue: Joi.array().items(Joi.number().integer().min(0).optional()),
    bedroomsValue: Joi.array().items(Joi.number().integer().min(0).optional()),
    price: Joi.object({
      value: Joi.number().min(0).optional(),
      period: Joi.string().valid("monthly", "yearly").optional(),
    }).optional(),
    size: Joi.number().min(0).optional(),

    location: Joi.string()
      .pattern(/^(\d+)(\.\d+)*$/)
      .optional(), // assuming ObjectId

    amenities: Joi.array().items(Joi.string()).optional(),
  }),
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});
