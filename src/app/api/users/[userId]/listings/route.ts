import { NextResponse } from "next/server";
import { getUserListings } from "@/database/users";
import { ServerError } from "@/lib/error";
import parseOptions from "@/util/parseOptions";

export interface Context {
  params: {
    userId: string;
  };
}

export const GET = async (
  request: Request,
  { params: { userId } }: Context
): Promise<Response> => {
  const options = parseOptions(request.url);
  const favorites = await getUserListings(userId, options);
  if (favorites instanceof ServerError) {
    const response = new Response(favorites.message, {
      status: favorites.status,
    });
    return response;
  }
  return NextResponse.json(favorites);
};
