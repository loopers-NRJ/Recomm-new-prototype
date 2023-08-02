import { NextResponse } from "next/server";
import * as Models from "@/database/models";
import { ServerError } from "@/lib/error";
import parseOptions from "@/util/parseOptions";

export const GET = async (request: Request): Promise<Response> => {
  const options = parseOptions(request.url);
  const brand = await Models.getModels(options);
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
