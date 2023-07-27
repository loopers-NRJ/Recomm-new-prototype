import { NextResponse } from "next/server";
import * as Products from "@/database/products";
import { ServerError } from "@/lib/error";

export interface Context {
  params: {
    productId: string;
  };
}

export const GET = async (
  _: Request,
  { params: { productId } }: Context
): Promise<Response> => {
  const brand = await Products.getProduct(productId);
  if (brand instanceof ServerError) {
    const response = new Response(brand.message, {
      status: brand.status,
    });
    return response;
  }
  return NextResponse.json(brand);
};

export const PUT = async (
  request: Request,
  { params: { productId } }: Context
): Promise<Response> => {
  const { price, images, description } = await request.json();
  const model = await Products.updateProduct({
    id: productId,
    price,
    description,
    images,
  });
  if (model instanceof ServerError) {
    const response = new Response(model.message, {
      status: model.status,
    });
    return response;
  }
  return NextResponse.json(model);
};

export const DELETE = async (
  _: Request,
  { params: { productId } }: Context
): Promise<Response> => {
  const model = await Products.deleteProduct(productId);
  if (model instanceof ServerError) {
    const response = new Response(model.message, {
      status: model.status,
    });
    return response;
  }
  return NextResponse.json(model);
};
