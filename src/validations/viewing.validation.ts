import Joi from "joi";

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/, "invalid id");
export const scheduleViewingSchema = Joi.object({
  contactId: objectId.required(),
  propertyId: objectId.required(),
  datetime: Joi.date().required(),
  notes: Joi.string().optional(),
}).required();

export const updateViewingSchema = Joi.object({
  status: Joi.string().valid("pending", "completed", "no-show"),
  notes: Joi.string().optional(),
}).required();
