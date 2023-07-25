import { NextResponse } from "next/server";
import { ServerError } from "@/util/error";
import * as Models from "@/database/models";
import type { Context } from "./route";

export const GET = async (
  _: Request,
  { params: { modelId } }: Context
): Promise<Response> => {
  const products = await Models.getProductsByModel(modelId);
  if (products instanceof ServerError) {
    const response = new Response(products.message, {
      status: products.status,
    });
    return response;
  }
  return NextResponse.json(products);
};
