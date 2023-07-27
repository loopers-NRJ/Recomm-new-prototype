import { NextResponse } from "next/server";
import * as Models from "@/database/models";
import { ServerError } from "@/util/error";

export const GET = async (request: Request): Promise<Response> => {
  const brand = await Models.getModels();
  if (brand instanceof ServerError) {
    const response = new Response(brand.message, {
      status: brand.status,
    });
    return response;
  }
  return NextResponse.json(brand);
};

export const POST = async (request: Request): Promise<Response> => {
  const { name, categoryIds, brandId } = await request.json();
  const model = await Models.createModel({ name, brandId, categoryIds });
  if (model instanceof ServerError) {
    const response = new Response(model.message, {
      status: model.status,
    });
    return response;
  }
  return NextResponse.json(model);
};
