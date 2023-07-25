import bcrypt from "bcryptjs";

import type { Product, User } from "@prisma/client";
import client from "./client";
import { ServerError } from "@/util/error";

export const createUser = async (
  email: string,
  name: string,
  password: string
): Promise<User | ServerError> => {
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
    return new ServerError(`Cannot create the user with email: ${email}`);
  }
};

export const getMyListings = async (
  userId: string
): Promise<Product[] | ServerError> => {
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
    return new ServerError(`Cannot find listings for user with id: ${userId}`);
  }
};

export const getUser = async (
  email: string,
  password: string
): Promise<User | ServerError> => {
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user == null) {
      return new ServerError("User not found", 404);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new ServerError("Incorrect password", 400);
    }
    return user;
  } catch (error) {
    return new ServerError(`Cannot find user with email: ${email}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByUser = async (
  userId: string
): Promise<Product[] | ServerError> => {
  try {
    const products = await client.product.findMany({
      where: {
        userId,
      },
    });
    return products;
  } catch (error) {
    return new ServerError(`Cannot get the product with user id: ${userId}`);
  }
};
