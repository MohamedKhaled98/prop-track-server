import Joi from "joi";

export const createAgentSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Full name is required.",
    "string.min": "Full name must be at least 3 characters long.",
    "string.max": "Full name cannot exceed 100 characters.",
    "any.required": "Full name is required.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Allow or disallow specific TLDs
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),
  contactOptions: Joi.array()
    .items(Joi.object({ type: Joi.string(), value: Joi.string() }))
    .messages({
      "array.base": "Contact options must be an array.",
      "any.only": "Invalid contact option provided.",
    })
    .optional(),
}).required();
