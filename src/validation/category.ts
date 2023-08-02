import Joi from "joi";
import ObjectId from "./objectId";

export interface CreateCategoryProps {
  name: string;
  picture: string;
}

export const createCategoryValidator = Joi.object({
  name: Joi.string().min(1).max(255).label("Name").required(),
  picture: Joi.string().min(1).max(255).label("Picture").required(),
});
export interface UpdateCategoryProps {
  id: string;
  name?: string;
  picture?: string;
}

export const updateCategoryValidator = Joi.object({
  id: ObjectId,
  name: Joi.string().min(1).max(255).label("Name"),
  picture: Joi.string().min(1).max(255).label("Picture"),
});
