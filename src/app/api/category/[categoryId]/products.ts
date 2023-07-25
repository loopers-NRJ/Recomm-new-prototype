import { ServerError } from "@/util/error";
import { NextResponse } from "next/server";
import * as Category from "@/database/category";

import type { Context } from "./route";

export const GET = async (
  _: Request,
  { params: { categoryId } }: Context
): Promise<Response> => {
  const products = await Category.getProductsByCategory(categoryId);
  if (products instanceof ServerError) {
    const response = new Response(products.message, {
      status: products.status,
    });
    return response;
  }
  return NextResponse.json(products);
};
