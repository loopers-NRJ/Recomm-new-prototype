import Joi from "joi";
import ObjectId from "./objectId";

export interface CreateBrandProps {
  name: string;
  picture: string;
}
export const createBrandValidator = Joi.object({
  name: Joi.string().min(1).max(255).label("Name").required(),
  picture: Joi.string().min(1).label("Picture").required(),
});

export interface UpdateBrandProps {
  id: string;
  name?: string;
  picture?: string;
}

export const updateBrandValidator = Joi.object({
  id: ObjectId,
  name: Joi.string().min(1).max(255).label("Name"),
  picture: Joi.string().min(1).label("Picture"),
});
