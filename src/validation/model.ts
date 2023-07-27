import Joi from "joi";
import ObjectId from "./objectId";

export interface CreateModelProps {
  name: string;
  brandId: string;
  categoryIds: string[];
}
export const createModelValidator = Joi.object({
  name: Joi.string().min(1).max(255).label("Name").required(),
  brandId: ObjectId,
  categoryIds: Joi.array()
    .items(Joi.string())
    .label("Category IDs")
    .min(1)
    .required(),
});

export interface UpdateModelProps {
  id: string;
  name?: string;
  categoryIds?: string[];
}

export const updateModelValidator = Joi.object({
  id: ObjectId,
  name: Joi.string().min(1).max(255).label("Name"),
  categoryIds: Joi.array().items(Joi.string()).label("Category IDs").min(1),
});
