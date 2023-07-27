import { ServerError } from "@/lib/error";
import client from "./client";
import type { Brand, Model, Product } from "@prisma/client";
import {
  type UpdateBrandProps,
  type CreateBrandProps,
} from "@/validation/brand";
import { createModelValidator, updateModelValidator } from "@/validation/model";
import { idValidator } from "@/validation/objectId";

export const getBrand = async (id: string): Promise<Brand | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const brand = await client.brand.findUnique({
      where: {
        id,
      },
    });
    if (brand == null) {
      return new ServerError("Brand not found", 404);
    }
    return brand;
  } catch (error) {
    return new ServerError(`Cannot get the brand with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getBrands = async (): Promise<Brand[] | ServerError> => {
  try {
    const brands = await client.brand.findMany();
    return brands;
  } catch (error) {
    return new ServerError("Cannot get the brands");
  }
};

export const createBrand = async ({
  name,
}: CreateBrandProps): Promise<Brand | ServerError> => {
  const { error } = createModelValidator.validate({ name });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const brand = await client.brand.create({
      data: {
        name,
      },
    });
    return brand;
  } catch (error) {
    return new ServerError(`Cannot create the brand with name: ${name}`);
  }
};

export const updateBrand = async ({
  id,
  name,
}: UpdateBrandProps): Promise<Brand | ServerError> => {
  const { error } = updateModelValidator.validate({ id, name });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const brand = await client.brand.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return brand;
  } catch (error) {
    return new ServerError(`Cannot update the brand with id: ${id}`);
  }
};

export const deleteBrand = async (id: string): Promise<Brand | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const brand = await client.brand.delete({
      where: {
        id,
      },
    });
    return brand;
  } catch (error) {
    return new ServerError(`Cannot delete the brand with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getModelsByBrand = async (
  id: string
): Promise<Model[] | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const models = await client.model.findMany({
      where: {
        brandId: id,
      },
    });
    return models;
  } catch (error) {
    return new ServerError(`Cannot get the models of brand with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByBrand = async (
  id: string
): Promise<Product[] | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const products = await client.product.findMany({
      where: {
        model: {
          brandId: id,
        },
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
    return new ServerError(`Cannot get the products with brand id: ${id}`);
  }
};
