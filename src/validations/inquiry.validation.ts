import Joi from "joi";

export const inquirySchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  propertyOfInterest: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, "invalid id")
    .optional(),
}).required();
