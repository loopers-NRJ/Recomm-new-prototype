import type { Model } from "@prisma/client";
import client, { matchError } from "./client";
import { ServerError } from "@/lib/error";
import {
  type UpdateModelProps,
  type CreateModelProps,
  createModelValidator,
  updateModelValidator,
} from "@/validation/model";
import { idValidator } from "@/validation/objectId";
import { type Product, productItems } from "./products";

export const getModel = async (id: string): Promise<Model | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const model = await client.model.findUnique({
      where: {
        id,
      },
    });
    if (model == null) {
      return new ServerError("Model not found", 404);
    }
    return model;
  } catch (error) {
    return matchError(error, "Model", `Cannot get the model with id: ${id}`);
  }
};

export const getModels = async ({
  search,
  sortOrder,
  sortBy,
  page,
  limit,
}: FunctionalityOptions): Promise<Model[] | ServerError> => {
  try {
    const models = await client.model.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    return models;
  } catch (error) {
    return matchError(error, "Models", "Cannot get the models");
  }
};

export const createModel = async ({
  name,
  brandId,
  categoryIds,
}: CreateModelProps): Promise<Model | ServerError> => {
  const { error } = createModelValidator.validate({
    name,
    brandId,
    categoryIds,
  });
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const categories = await client.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });
    if (categories.length !== categoryIds.length) {
      return new ServerError("Category not found");
    }

    const brand = await client.brand.findUnique({
      where: {
        id: brandId,
      },
    });
    if (brand == null) return new ServerError("Brand not found");

    const model = await client.model.create({
      data: {
        name,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        brand: {
          connect: {
            id: brand.id,
          },
        },
      },
    });

    return model;
  } catch (error) {
    return matchError(
      error,
      "Model",
      `Cannot create the model with name: ${name}`
    );
  }
};

export const updateModel = async ({
  id,
  name,
  categoryIds,
}: UpdateModelProps): Promise<Model | ServerError> => {
  const { error } = updateModelValidator.validate({
    id,
    name,
    categoryIds,
  });
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    if (categoryIds != null) {
      const category = await client.category.findMany({
        where: {
          id: {
            in: categoryIds,
          },
        },
      });
      categoryIds = category.map((c) => c.id);
    }
    const model = await client.model.update({
      where: {
        id,
      },
      data: {
        name,
        categories: {
          set: categoryIds?.map((id) => ({ id })),
        },
      },
    });

    return model;
  } catch (error) {
    return matchError(error, "Model", `Cannot update the model with id: ${id}`);
  }
};

export const deleteModel = async (id: string): Promise<Model | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const model = await client.model.delete({
      where: {
        id,
      },
    });
    return model;
  } catch (error) {
    return matchError(error, "Model", `Cannot delete the model with id: ${id}`);
  }
};

export const getProductsByModel = async (
  id: string,
  { search, sortOrder, sortBy, page, limit }: FunctionalityOptions
): Promise<Product[] | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const products = await client.product.findMany({
      where: {
        modelId: id,
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
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        model: {
          name: sortBy === "name" ? sortOrder : undefined,
        },
        createdAt: sortBy === "createdAt" ? sortOrder : undefined,
      },
      select: productItems,
    });
    return products;
  } catch (error) {
    return matchError(
      error,
      "Products",
      `Cannot get the products with model id: ${id}`
    );
  }
};
