import Joi from "joi";

const ObjectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .label("Id")
  .messages({
    "string.pattern.base": `Invalid {#label} with value {#value}`,
  })
  .required();

export const idValidator = ObjectId;

export default ObjectId;
