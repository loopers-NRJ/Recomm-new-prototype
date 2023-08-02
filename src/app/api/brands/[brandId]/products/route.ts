import { NextResponse } from "next/server";
import { ServerError } from "@/lib/error";
import * as Brands from "@/database/brands";
import type { Context } from "../route";
import parseOptions from "@/util/parseOptions";

export const GET = async (
  request: Request,
  { params: { brandId } }: Context
): Promise<Response> => {
  const options = parseOptions(request.url);
  const products = await Brands.getProductsByBrand(brandId, options);
  if (products instanceof ServerError) {
    const response = new Response(products.message, {
      status: products.status,
    });
    return response;
  }
  return NextResponse.json(products);
};
