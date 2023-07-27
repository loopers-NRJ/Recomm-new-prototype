import { NextResponse } from "next/server";
import * as Models from "@/database/models";
import { ServerError } from "@/util/error";

export interface Context {
  params: {
    modelId: string;
  };
}

export const GET = async (
  _: Request,
  { params: { modelId } }: Context
): Promise<Response> => {
  const brand = await Models.getModel(modelId);
  if (brand instanceof ServerError) {
    const response = new Response(brand.message, {
      status: brand.status,
    });
    return response;
  }
  return NextResponse.json(brand);
};

export const PUT = async (
  request: Request,
  { params: { modelId } }: Context
): Promise<Response> => {
  const { name, categoryIds } = await request.json();
  const model = await Models.updateModel({
    id: modelId,
    name,
    categoryIds,
  });
  if (model instanceof ServerError) {
    const response = new Response(model.message, {
      status: model.status,
    });
    return response;
  }
  return NextResponse.json(model);
};

export const DELETE = async (
  _: Request,
  { params: { modelId } }: Context
): Promise<Response> => {
  const model = await Models.deleteModel(modelId);
  if (model instanceof ServerError) {
    const response = new Response(model.message, {
      status: model.status,
    });
    return response;
  }
  return NextResponse.json(model);
};
