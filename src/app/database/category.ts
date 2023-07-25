import type { Category } from "@prisma/client";
import client from "./client";

export const getCategory = async (id: string): Promise<Category | Error> => {
  try {
    const category = await client.category.findUnique({
      where: {
        id,
      },
    });
    if (category == null) {
      return new Error("Category not found");
    }
    return category;
  } catch (error) {
    return new Error(`Cannot get the category with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getCategories = async (): Promise<Category[] | Error> => {
  try {
    const categories = await client.category.findMany();
    return categories;
  } catch (error) {
    return new Error("Cannot get the categories");
  }
};

export const createCategory = async (
  name: string,
  picture: string
): Promise<Category | Error> => {
  try {
    const category = await client.category.create({
      data: {
        name,
        picture,
      },
    });
    return category;
  } catch (error) {
    return new Error(`Cannot create the category with name: ${name}`);
  }
};

export const updateCategory = async (
  id: string,
  name: string
): Promise<Category | Error> => {
  try {
    const category = await client.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return category;
  } catch (error) {
    return new Error(`Cannot update the category with id: ${id}`);
  }
};
