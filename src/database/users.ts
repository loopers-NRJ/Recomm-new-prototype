import { type Product, type User } from "@prisma/client";
import client, { matchError } from "./client";
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
    return matchError(
      error,
      "User",
      `Cannot create the user with email: ${email}`
    );
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
    return matchError(
      error,
      "Users",
      `Cannot search users with query: ${query}`
    );
  }
};

export const getUserByEmail = async (
  email: string
): Promise<User | ServerError> => {
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user == null) {
      return new ServerError(`User with email: ${email} not found`, 404);
    }
    return user;
  } catch (error) {
    return matchError(error, "User", `Cannot find user with email: ${email}`);
  }
};

export const getProductsByUser = async (
  userId: string
): Promise<Product[] | ServerError> => {
  const { error } = idValidator.validate({ id: userId });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const listings = await client.product.findMany({
      where: {
        ownerId: userId,
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
    return matchError(
      error,
      "Listings",
      `Cannot find listings for user with id: ${userId}`
    );
  }
};
