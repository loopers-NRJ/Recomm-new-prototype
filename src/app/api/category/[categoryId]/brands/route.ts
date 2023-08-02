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
  const brands = await Category.getBrandsByCategory(categoryId, options);
  if (brands instanceof ServerError) {
    const response = new Response(brands.message, {
      status: brands.status,
    });
    return response;
  }
  return NextResponse.json(brands);
};
