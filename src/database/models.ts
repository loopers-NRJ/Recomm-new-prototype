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

interface CreateModelProps {
  name: string;
  brandId: string;
  categoryIds: string[];
}
export const createModel = async ({
  name,
  brandId,
  categoryIds,
}: CreateModelProps): Promise<Model | ServerError> => {
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
    return new ServerError(`Cannot create the model with name: ${name}`);
  }
};

interface UpdateModelProps {
  id: string;
  name?: string;
  categoryIds?: string[];
}
export const updateModel = async ({
  id,
  name,
  categoryIds: categories,
}: UpdateModelProps): Promise<Model | ServerError> => {
  try {
    if (categories != null) {
      const category = await client.category.findMany({
        where: {
          id: {
            in: categories,
          },
        },
      });
      categories = category.map((c) => c.id);
    }
    const model = await client.model.update({
      where: {
        id,
      },
      data: {
        name,
        categories: {
          set: categories?.map((id) => ({ id })),
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
            categories: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    return new ServerError(`Cannot get the products with model id: ${id}`);
  }
};
