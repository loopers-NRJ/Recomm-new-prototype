import type { Model } from "@prisma/client";
import client from "./client";

export const getModel = async (id: string): Promise<Model | Error> => {
  try {
    const model = await client.model.findUnique({
      where: {
        id,
      },
    });
    if (model == null) {
      return new Error("Model not found");
    }
    return model;
  } catch (error) {
    return new Error(`Cannot get the model with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getModels = async (): Promise<Model[] | Error> => {
  try {
    const models = await client.model.findMany();
    return models;
  } catch (error) {
    return new Error("Cannot get the models");
  }
};

export const createModel = async (
  name: string,
  brandId: string,
  categoryId: string
): Promise<Model | Error> => {
  try {
    const category = await client.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (category == null) {
      return new Error("Category not found");
    }

    const brand = await client.brand.findUnique({
      where: {
        id: brandId,
      },
    });
    if (brand == null) return new Error("Brand not found");

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
    return new Error(`Cannot create the model with name: ${name}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getModelsByBrand = async (
  brandId: string
): Promise<Model[] | Error> => {
  try {
    const models = await client.model.findMany({
      where: {
        brandId,
      },
    });
    return models;
  } catch (error) {
    return new Error(`Cannot get the models of brand with id: ${brandId}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getModelsByCategory = async (
  id: string
): Promise<Model[] | Error> => {
  try {
    const models = await client.model.findMany({
      where: {
        categoryId: id,
      },
    });
    return models;
  } catch (error) {
    return new Error(`Cannot get the models with category id: ${id}`);
  }
};
