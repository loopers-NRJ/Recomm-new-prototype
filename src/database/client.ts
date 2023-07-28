import { PrismaClient } from "@prisma/client";

const instance = new PrismaClient();

instance.$extends({
  query: {
    room: {
      create: async ({ query, args }) => {
        const room = await query(args);
        room.highestBid = room.product?.price;
        return room;
      },
    },
  },
});
export default instance;
