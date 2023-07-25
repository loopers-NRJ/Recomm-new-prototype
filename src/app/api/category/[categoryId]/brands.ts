import { ServerError } from "@/util/error";
import { NextResponse } from "next/server";
import * as Category from "@/database/category";

import type { Context } from "./route";

export const GET = async (
  _: Request,
  { params: { categoryId } }: Context
): Promise<Response> => {
  const brands = await Category.getBrandsByCategory(categoryId);
  if (brands instanceof ServerError) {
    const response = new Response(brands.message, {
      status: brands.status,
    });
    return response;
  }
  return NextResponse.json(brands);
};
