import { NextResponse } from "next/server";
import { ServerError } from "@/util/error";
import * as Brands from "@/database/brands";
import type { Context } from "./route";

export const GET = async (
  _: Request,
  { params: { brandId } }: Context
): Promise<Response> => {
  const models = await Brands.getModelsByBrand(brandId);
  if (models instanceof ServerError) {
    const response = new Response(models.message, {
      status: models.status,
    });
    return response;
  }
  return NextResponse.json(models);
};
