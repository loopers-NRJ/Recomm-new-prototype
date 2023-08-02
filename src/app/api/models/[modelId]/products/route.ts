import { NextResponse } from "next/server";
import { ServerError } from "@/lib/error";
import * as Models from "@/database/models";
import type { Context } from "../route";
import parseOptions from "@/util/parseOptions";

export const GET = async (
  request: Request,
  { params: { modelId } }: Context
): Promise<Response> => {
  const options = parseOptions(request.url);
  const products = await Models.getProductsByModel(modelId, options);
  if (products instanceof ServerError) {
    const response = new Response(products.message, {
      status: products.status,
    });
    return response;
  }
  return NextResponse.json(products);
};
