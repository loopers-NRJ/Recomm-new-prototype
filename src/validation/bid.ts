import Joi from "joi";
import ObjectId from "./objectId";

export interface CreateBidProps {
  roomId: string;
  userId: string;
  price: number;
}
export const createBidValidator = Joi.object({
  roomId: ObjectId,
  userId: ObjectId,
  price: Joi.number().min(0).label("Price").required(),
});
