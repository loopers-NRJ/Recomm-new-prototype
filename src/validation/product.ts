import Joi from "joi";
import ObjectId from "./objectId";

export interface CreateProductProps {
  userId: string;
  modelId: string;
  price: number;
  description: string;
  images: string[];
}

export const createProductValidator = Joi.object({
  userId: ObjectId,
  modelId: ObjectId,
  price: Joi.number().min(0).label("Price").required(),
  description: Joi.string().min(1).max(255).label("Description").required(),
  images: Joi.array().items(Joi.string()).label("Images").required(),
});

export interface UpdateProductProps {
  id: string;
  price?: number;
  description?: string;
  images?: string[];
}

export const updateProductValidator = Joi.object({
  id: ObjectId,
  price: Joi.number().min(0).label("Price"),
  description: Joi.string().min(1).max(255).label("Description"),
  images: Joi.array().items(Joi.string()).label("Images"),
});
