import { ServerError } from "@/lib/error";
import type { Bid } from "@prisma/client";
import client, { matchError } from "./client";
import { type CreateBidProps, createBidValidator } from "@/validation/bid";
export const postABid = async ({
  roomId,
  price,
  userId, // TODO: get user instead of userId
}: CreateBidProps): Promise<Bid | ServerError> => {
  const { error } = createBidValidator.validate({ price, roomId, userId });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    return await client.$transaction(
      async (client) => {
        // TODO: use seperate try catch for each query to return more specific error

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
              product: true,
            },
          });
          if (room == null) {
            return new ServerError("Room not found", 404);
          }

          if (room.product.price >= price) {
            return new ServerError("Bid amount too low", 400);
          }

          if (room.product.ownerId === userId) {
            return new ServerError("You cannot bid on your own product", 400);
          }

          if (room.product.buyerId != null) {
            return new ServerError("Product already sold", 400);
          }

          if (room.highestBid != null && price <= room.highestBid.price) {
            return new ServerError("Bid amount too low", 400);
          }

          if (room.highestBid != null && room.highestBid.userId === userId) {
            return new ServerError("You already have the highest bid", 400);
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
        } catch (error) {
          return matchError(error, "Bid", "cannot post bid");
        }

        try {
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
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );
  } catch (error) {
    return matchError(error, "Bid", "cannot post bid");
  }
};
