import { ServerError } from "@/lib/error";
import type { Bid } from "@prisma/client";
import client, { matchError } from "./client";

export const postABid = async ({
  roomId,
  price,
  userId,
}: {
  roomId: string;
  price: number;
  userId: string;
  //   TODO: get user instead of userId
}): Promise<Bid | ServerError> => {
  if (Number.isNaN(price) || price < 0) {
    return new ServerError("Invalid price", 400);
  }
  return await client.$transaction(async (client) => {
    try {
      const room = await client.room.findUnique({
        where: {
          id: roomId,
        },
        include: {
          highestBid: {
            include: {
              user: true,
            },
          },
        },
      });
      if (room == null) {
        return new ServerError("Room not found", 404);
      }

      if (room.highestBid != null && price <= room.highestBid.price) {
        return new ServerError("Bid amount too low", 400);
      }

      if (room.highestBid != null) {
        await client.bid.update({
          where: {
            id: room.highestBid.id,
          },
          data: {
            highestBiddedRoom: {
              disconnect: true,
            },
          },
        });
      }

      const bid = await client.bid.create({
        data: {
          price,
          room: {
            connect: {
              id: roomId,
            },
          },
          highestBiddedRoom: {
            connect: {
              id: roomId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return bid;
    } catch (error) {
      return matchError(error, "Bid", "cannot post bid");
    }
  });
};
