import Joi from "joi";
import ObjectId from "./objectId";

export interface CreateProductProps {
  userId: string;
  modelId: string;
  price: number;
  description: string;
  pictures: string[];
  duration?: number;
}

export const createProductValidator = Joi.object({
  userId: ObjectId,
  modelId: ObjectId,
  price: Joi.number().min(0).label("Price").required(),
  description: Joi.string().min(1).max(255).label("Description").required(),
  pictures: Joi.array().items(Joi.string()).label("Images").required(),
  duration: Joi.number().min(5).label("Duration"),
});

export interface UpdateProductProps {
  id: string;
  price?: number;
  description?: string;
  pictures?: string[];
}

export const updateProductValidator = Joi.object({
  id: ObjectId,
  price: Joi.number().min(0).label("Price"),
  description: Joi.string().min(1).max(255).label("Description"),
  pictures: Joi.array().items(Joi.string()).label("Images"),
});
