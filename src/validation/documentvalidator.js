import Joi from "joi";

export const documentSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
  categories: Joi.string().required(),
  questions: Joi.array().items(Joi.object()).optional() // depends on your Quiz schema
});
