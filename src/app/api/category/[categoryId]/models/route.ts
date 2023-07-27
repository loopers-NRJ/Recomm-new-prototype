import { ServerError } from "@/lib/error";
import { NextResponse } from "next/server";
import * as Category from "@/database/category";

import type { Context } from "../route";

export const GET = async (
  _: Request,
  { params: { categoryId } }: Context
): Promise<Response> => {
  const models = await Category.getModelsByCategory(categoryId);
  if (models instanceof ServerError) {
    const response = new Response(models.message, {
      status: models.status,
    });
    return response;
  }
  return NextResponse.json(models);
};
