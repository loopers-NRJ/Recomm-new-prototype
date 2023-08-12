import { NextResponse } from "next/server";
import { getUserById } from "@/database/users";
import { ServerError } from "@/lib/error";

export interface Context {
  params: {
    userId: string;
  };
}

export const GET = async (
  _: Request,
  { params: { userId } }: Context
): Promise<Response> => {
  const user = await getUserById(userId);
  if (user instanceof ServerError) {
    const response = new Response(user.message, {
      status: user.status,
    });
    return response;
  }
  return NextResponse.json(user);
};
