import { postABid } from "@/database/room";
import { ServerError } from "@/lib/error";
import type { NextRequest } from "next/server";

async function handler(request: NextRequest): Promise<Response> {
  // get params from request
  switch (request.method) {
    case "GET":
      return await GET(request);
    case "POST":
      return await POST(request);
    default:
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          Allow: "GET, POST",
        },
      });
  }
}

interface connectedUser {
  stream: TransformStream;
  // add user details in the interface
  // user: User;
}
const connectedUsers = new Set<connectedUser>();
// TODO: for now this route allow any user to connect to any room
// TODO: only allow authenticated users to connect to rooms

export const GET = async (request: Request): Promise<Response> => {
  const stream = new TransformStream();
  const connectedUser = { stream };
  connectedUsers.add(connectedUser);
  console.log("client connected");
  console.log(connectedUsers.size);
  return new Response(connectedUser.stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
};

const sendMessage = async (data: any, user: connectedUser): Promise<void> => {
  const encoder = new TextEncoder();

  console.log("sending message");
  const writer = user.stream.writable.getWriter();
  await writer.ready;
  console.log("writer ready");
  await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  console.log("message sent");
  writer.releaseLock();
};
export const POST = async (request: NextRequest): Promise<Response> => {
  // TODO: only allow authenticated users to connect to rooms
  const params = new URL(request.nextUrl).searchParams;
  const roomId = params.get("roomId") as string;
  const { price, userId } = await request.json();
  const bid = await postABid({ roomId, price, userId });
  if (bid instanceof ServerError) {
    const response = new Response(bid.message, {
      status: bid.status,
    });
    return response;
  }
  connectedUsers.forEach((user) => {
    sendMessage("bid", user).catch((error) => {
      console.log(error);
    });
  });
  return new Response("ok");
};

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default handler;
