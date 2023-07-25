import { ServerError } from "@/util/error";
import client from "./client";
import type { Brand, Model, Product } from "@prisma/client";

export const getBrand = async (id: string): Promise<Brand | ServerError> => {
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

export const createBrand = async (
  name: string
): Promise<Brand | ServerError> => {
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

export const updateBrand = async (
  id: string,
  name: string
): Promise<Brand | ServerError> => {
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
  brandId: string
): Promise<Model[] | ServerError> => {
  try {
    const models = await client.model.findMany({
      where: {
        brandId,
      },
    });
    return models;
  } catch (error) {
    return new ServerError(
      `Cannot get the models of brand with id: ${brandId}`
    );
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByBrand = async (
  id: string
): Promise<Product[] | ServerError> => {
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
            category: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    return new ServerError(`Cannot get the products with brand id: ${id}`);
  }
};
