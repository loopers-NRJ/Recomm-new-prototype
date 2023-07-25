import type { Product, User } from "@prisma/client";
import client from "./client";

import bcrypt from "bcryptjs";

export const createUser = async (
  email: string,
  name: string,
  password: string
): Promise<User | Error> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await client.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return user;
  } catch (error) {
    return new Error(`Cannot create the user with email: ${email}`);
  }
};

export const getMyListings = async (
  userId: string
): Promise<Product[] | Error> => {
  try {
    const listings = await client.product.findMany({
      where: {
        userId,
      },
      include: {
        model: {
          include: {
            brand: true,
            category: true,
          },
        },
      },
    });
    return listings;
  } catch (error) {
    return new Error(`Cannot find listings for user with id: ${userId}`);
  }
};

export const getUser = async (
  email: string,
  password: string
): Promise<User | Error> => {
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user == null) {
      return new Error("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect === false) {
      return new Error("Incorrect password");
    }
    return user;
  } catch (error) {
    return new Error(`Cannot find user with email: ${email}`);
  }
};
