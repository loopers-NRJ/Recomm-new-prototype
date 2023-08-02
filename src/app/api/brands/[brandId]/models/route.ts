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
  const models = await Brands.getModelsByBrand(brandId, options);
  if (models instanceof ServerError) {
    const response = new Response(models.message, {
      status: models.status,
    });
    return response;
  }
  return NextResponse.json(models);
};
