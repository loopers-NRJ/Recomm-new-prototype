import type { Model, Product } from "@prisma/client";
import client from "./client";
import { ServerError } from "@/util/error";

export const getModel = async (id: string): Promise<Model | ServerError> => {
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
    return new ServerError(`Cannot get the model with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getModels = async (): Promise<Model[] | ServerError> => {
  try {
    const models = await client.model.findMany();
    return models;
  } catch (error) {
    return new ServerError("Cannot get the models");
  }
};

export const createModel = async (
  name: string,
  brandId: string,
  categoryId: string
): Promise<Model | ServerError> => {
  try {
    const category = await client.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (category == null) {
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
        category: {
          connect: {
            id: category.id,
          },
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
    return new ServerError(`Cannot create the model with name: ${name}`);
  }
};

// TODO: need some attention here
// let the model to store an array of categories
// instead of a single category
export const updateModel = async (
  id: string,
  name?: string,
  categoryId?: string
): Promise<Model | ServerError> => {
  try {
    const category = await client.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (category == null) {
      return new ServerError("Category not found", 404);
    }

    const model = await client.model.update({
      where: {
        id,
      },
      data: {
        name,
        category: {
          connect: {
            id: category.id,
          },
        },
      },
    });

    return model;
  } catch (error) {
    return new ServerError(`Cannot update the model with id: ${id}`);
  }
};

export const deleteModel = async (id: string): Promise<Model | ServerError> => {
  try {
    const model = await client.model.delete({
      where: {
        id,
      },
    });
    return model;
  } catch (error) {
    return new ServerError(`Cannot delete the model with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByModel = async (
  id: string
): Promise<Product[] | ServerError> => {
  try {
    const products = await client.product.findMany({
      where: {
        modelId: id,
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
    return products;
  } catch (error) {
    return new ServerError(`Cannot get the products with model id: ${id}`);
  }
};
