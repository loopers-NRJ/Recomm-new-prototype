import { NextResponse } from "next/server";
import { searchUsers } from "@/database/users";
import { ServerError } from "@/lib/error";
import parseOptions from "@/util/parseOptions";

export const GET = async (request: Request): Promise<Response> => {
  const options = parseOptions(request.url);
  const user = await searchUsers(options);
  if (user instanceof ServerError) {
    const response = new Response(user.message, {
      status: user.status,
    });
    return response;
  }
  return NextResponse.json(user);
};
