import { postABid } from "@/database/room";
import { ServerError } from "@/lib/error";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  switch (request.method) {
    case "GET":
      await GET(request, response);
      break;
    case "POST":
      await POST(request, response);
      break;
    default:
      response.status(405).end();
  }
};

interface connectedUser {
  response: NextApiResponse;
  // add user details in the interface
  // user: User;
}
const connectedUsers = new Set<connectedUser>();
// TODO: for now this route allow any user to connect to any room
// TODO: only allow authenticated users to connect to rooms

export const GET = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const connectedUser = { response };
  connectedUsers.add(connectedUser);
  console.log("client connected");
  console.log(connectedUsers.size);

  request.on("close", () => {
    connectedUsers.delete(connectedUser);
    console.log("client disconnected");
    console.log(connectedUsers.size);
  });
  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Connection", "keep-alive");
  response.setHeader("Cache-Control", "no-cache");
  response.flushHeaders();
};

const sendMessage = async (data: any, user: connectedUser): Promise<void> => {
  const encoder = new TextEncoder();
  user.response.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
};
export const POST = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  // TODO: only allow authenticated users to connect to rooms
  const roomId = request.query.roomId as string;
  const { price, userId } = await request.body;
  const bid = await postABid({ roomId, price, userId });
  if (bid instanceof ServerError) {
    response.status(bid.status).json(bid.message);
    return;
  }

  connectedUsers.forEach((user) => {
    sendMessage(bid, user).catch((error) => {
      console.log(error);
    });
  });
  response.status(200).json(bid);
};

export default handler;
