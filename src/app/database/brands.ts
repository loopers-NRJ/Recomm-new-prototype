import client from "./client";
import type { Brand } from "@prisma/client";

export const getBrand = async (id: string): Promise<Brand | Error> => {
  try {
    const brand = await client.brand.findUnique({
      where: {
        id,
      },
    });
    if (brand == null) {
      return new Error("Brand not found");
    }
    return brand;
  } catch (error) {
    return new Error(`Cannot get the brand with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getBrands = async (): Promise<Brand[] | Error> => {
  try {
    const brands = await client.brand.findMany();
    return brands;
  } catch (error) {
    return new Error("Cannot get the brands");
  }
};

export const createBrand = async (name: string): Promise<Brand | Error> => {
  try {
    const brand = await client.brand.create({
      data: {
        name,
      },
    });
    return brand;
  } catch (error) {
    return new Error(`Cannot create the brand with name: ${name}`);
  }
};

export const updateBrand = async (
  id: string,
  name: string
): Promise<Brand | Error> => {
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
    return new Error(`Cannot update the brand with id: ${id}`);
  }
};

export const deleteBrand = async (id: string): Promise<Brand | Error> => {
  try {
    const brand = await client.brand.delete({
      where: {
        id,
      },
    });
    return brand;
  } catch (error) {
    return new Error(`Cannot delete the brand with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getBrandsByCategory = async (
  id: string
): Promise<Brand[] | Error> => {
  try {
    const brands = await client.brand.findMany({
      where: {
        models: {
          some: {
            categoryId: id,
          },
        },
      },
    });

    return brands;
  } catch (error) {
    return new Error(`Cannot get the brands with category id: ${id}`);
  }
};
