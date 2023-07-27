import { type Product, type User } from "@prisma/client";
import client from "./client";
import { ServerError } from "@/lib/error";
import {
  type SignupProps,
  signupValidator,
  getProviderVarient,
} from "@/validation/user";
import { idValidator } from "@/validation/objectId";

export const signup = async ({
  email,
  name,
  provider: providerString,
}: SignupProps): Promise<User | ServerError> => {
  const { error } = signupValidator.validate({
    email,
    name,
    provider: providerString,
  });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  const provider = getProviderVarient(providerString);

  try {
    const user = await client.user.create({
      data: {
        email,
        name,
        provider,
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
  const { error } = idValidator.validate({ id: userId });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const listings = await client.product.findMany({
      where: {
        userId,
      },
      include: {
        model: {
          include: {
            brand: true,
            categories: true,
          },
        },
      },
    });
    return listings;
  } catch (error) {
    return new ServerError(`Cannot find listings for user with id: ${userId}`);
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

// TODO: Implement search sort and pagination functionality
export const searchUsers = async (
  query: string
): Promise<User[] | ServerError> => {
  try {
    const users = await client.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return users;
  } catch (error) {
    return new ServerError(`Cannot search users with query: ${query}`);
  }
};
