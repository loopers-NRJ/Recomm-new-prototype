import { NextResponse } from "next/server";
import { ServerError } from "@/lib/error";
import * as Brands from "@/database/brands";
import type { Context } from "../route";

export const GET = async (
  _: Request,
  { params: { brandId } }: Context
): Promise<Response> => {
  const products = await Brands.getProductsByBrand(brandId);
  if (products instanceof ServerError) {
    const response = new Response(products.message, {
      status: products.status,
    });
    return response;
  }
  return NextResponse.json(products);
};
