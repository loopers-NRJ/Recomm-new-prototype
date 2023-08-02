import { ServerError } from "@/lib/error";
import { NextResponse } from "next/server";
import * as Category from "@/database/category";

import type { Context } from "../route";
import parseOptions from "@/util/parseOptions";

export const GET = async (
  request: Request,
  { params: { categoryId } }: Context
): Promise<Response> => {
  const options = parseOptions(request.url);
  const products = await Category.getProductsByCategory(categoryId, options);
  if (products instanceof ServerError) {
    const response = new Response(products.message, {
      status: products.status,
    });
    return response;
  }
  return NextResponse.json(products);
};
