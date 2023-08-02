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
  const models = await Category.getModelsByCategory(categoryId, options);
  if (models instanceof ServerError) {
    const response = new Response(models.message, {
      status: models.status,
    });
    return response;
  }
  return NextResponse.json(models);
};
