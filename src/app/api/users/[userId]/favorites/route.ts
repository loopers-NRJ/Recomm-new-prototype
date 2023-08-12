import { NextResponse } from "next/server";
import {
  addToFavorites,
  getUserFavorites,
  removeFromFavorites,
} from "@/database/users";
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
  const favorites = await getUserFavorites(userId, options);
  if (favorites instanceof ServerError) {
    const response = new Response(favorites.message, {
      status: favorites.status,
    });
    return response;
  }
  return NextResponse.json(favorites);
};

export const POST = async (
  request: Request,
  { params: { userId } }: Context
): Promise<Response> => {
  const { productId } = await request.json();
  const favorites = await addToFavorites(userId, productId);
  if (favorites instanceof ServerError) {
    const response = new Response(favorites.message, {
      status: favorites.status,
    });
    return response;
  }

  return NextResponse.json(favorites);
};

export const DELETE = async (
  request: Request,
  { params: { userId } }: Context
): Promise<Response> => {
  const { productId } = await request.json();
  const favorites = await removeFromFavorites(userId, productId);
  if (favorites instanceof ServerError) {
    const response = new Response(favorites.message, {
      status: favorites.status,
    });
    return response;
  }

  return NextResponse.json(favorites);
};
