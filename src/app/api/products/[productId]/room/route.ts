import { NextResponse } from "next/server";
import * as Products from "@/database/products";
import { ServerError } from "@/lib/error";
import type { Context } from "../route";
import parseOptions from "@/util/parseOptions";

export const GET = async (
  request: Request,
  { params: { productId } }: Context
): Promise<Response> => {
  const options = parseOptions(request.url);
  const room = await Products.getRoomByProduct(productId, options);
  if (room instanceof ServerError) {
    const response = new Response(room.message, {
      status: room.status,
    });
    return response;
  }
  return NextResponse.json(room);
};
