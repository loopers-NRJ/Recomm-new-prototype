import type { User } from "@prisma/client";
import client, { matchError } from "./client";
import { ServerError } from "@/lib/error";
import { idValidator } from "@/validation/objectId";
import { productItems, type ProductWithoutFavoritedUserId } from "./products";

export const searchUsers = async ({
  search,
  limit,
  page,
  sortBy,
  sortOrder,
}: FunctionalityOptions): Promise<User[] | ServerError> => {
  try {
    const users = await client.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    return users;
  } catch (error) {
    return matchError(
      error,
      "Users",
      `Cannot search users with query: ${search}`
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

export const getUserById = async (id: string): Promise<User | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (user == null) {
      return new ServerError(`User with id: ${id} not found`, 404);
    }
    return user;
  } catch (error) {
    return matchError(error, "User", `Cannot find user with id: ${id}`);
  }
};

export const getUserListings = async (
  userId: string,
  { limit, page, sortBy, sortOrder, search }: FunctionalityOptions
): Promise<ProductWithoutFavoritedUserId[] | ServerError> => {
  const { error } = idValidator.validate(userId);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const listings = await client.product.findMany({
      where: {
        ownerId: userId,
        OR: [
          {
            model: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            model: {
              brand: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        model: {
          name: sortBy === "name" ? sortOrder : undefined,
        },
        createdAt: sortBy === "createdAt" ? sortOrder : undefined,
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

export const getUserPurchases = async (
  userId: string,
  { limit, page, sortBy, sortOrder, search }: FunctionalityOptions
): Promise<ProductWithoutFavoritedUserId[] | ServerError> => {
  const { error } = idValidator.validate(userId);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const purchases = await client.product.findMany({
      where: {
        buyerId: userId,
        OR: [
          {
            model: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            model: {
              brand: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        model: {
          name: sortBy === "name" ? sortOrder : undefined,
        },
        createdAt: sortBy === "createdAt" ? sortOrder : undefined,
      },
      select: productItems,
    });
    return purchases;
  } catch (error) {
    return matchError(
      error,
      "Purchases",
      `Cannot find purchases for user with id: ${userId}`
    );
  }
};

export const getUserFavorites = async (
  userId: string,
  { limit, page, sortBy, sortOrder, search }: FunctionalityOptions
): Promise<ProductWithoutFavoritedUserId[] | ServerError> => {
  const { error } = idValidator.validate(userId);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const favorites = await client.product.findMany({
      where: {
        favoritedUsers: {
          some: {
            id: userId,
          },
        },
        OR: [
          {
            model: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            model: {
              brand: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        model: {
          name: sortBy === "name" ? sortOrder : undefined,
        },
        createdAt: sortBy === "createdAt" ? sortOrder : undefined,
      },
      select: productItems,
    });
    return favorites;
  } catch (error) {
    return matchError(
      error,
      "Favorites",
      `Cannot find favorites for user with id: ${userId}`
    );
  }
};

export const addToFavorites = async (
  userId: string,
  productId: string
): Promise<ServerError | null> => {
  const { error: userIdError } = idValidator.validate(userId);
  const { error: productIdError } = idValidator.validate(productId);
  if (userIdError != null) {
    return new ServerError(userIdError.message, 400);
  }
  if (productIdError != null) {
    return new ServerError(productIdError.message, 400);
  }
  try {
    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          connect: {
            id: productId,
          },
        },
      },
    });
    return null;
  } catch (error) {
    return matchError(
      error,
      "Favorites",
      `Cannot add product with id: ${productId} to favorites for user with id: ${userId}`
    );
  }
};

export const removeFromFavorites = async (
  userId: string,
  productId: string
): Promise<ServerError | null> => {
  const { error: userIdError } = idValidator.validate(userId);
  const { error: productIdError } = idValidator.validate(productId);
  if (userIdError != null) {
    return new ServerError(userIdError.message, 400);
  }
  if (productIdError != null) {
    return new ServerError(productIdError.message, 400);
  }
  try {
    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          disconnect: {
            id: productId,
          },
        },
      },
    });
    return null;
  } catch (error) {
    return matchError(
      error,
      "Favorites",
      `Cannot remove product with id: ${productId} from favorites for user with id: ${userId}`
    );
  }
};
