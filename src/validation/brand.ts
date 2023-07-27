import Joi from "joi";
import ObjectId from "./objectId";

export interface CreateBrandProps {
  name: string;
}
export const createBrandValidator = Joi.object({
  name: Joi.string().min(1).max(255).label("Name").required(),
});

export interface UpdateBrandProps {
  id: string;
  name?: string;
}

export const updateBrandValidator = Joi.object({
  id: ObjectId,
  name: Joi.string().min(1).max(255).label("Name"),
});
