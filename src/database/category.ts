import type { Brand, Category, Model, Product } from "@prisma/client";
import client, { matchError } from "./client";
import { ServerError } from "@/lib/error";
import { idValidator } from "@/validation/objectId";
import {
  type CreateCategoryProps,
  type UpdateCategoryProps,
  updateCategoryValidator,
  createCategoryValidator,
} from "@/validation/category";

export const getCategory = async (
  id: string
): Promise<Category | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const category = await client.category.findUnique({
      where: {
        id,
      },
    });
    if (category == null) {
      return new ServerError("Category not found", 404);
    }
    return category;
  } catch (error) {
    return matchError(
      error,
      "Category",
      `Cannot get the category with id: ${id}`
    );
  }
};

// TODO: Implement search sort and pagination functionality
export const getCategories = async (): Promise<Category[] | ServerError> => {
  try {
    const categories = await client.category.findMany();
    return categories;
  } catch (error) {
    return matchError(error, "Categories", "Cannot get the categories");
  }
};

export const createCategory = async ({
  name,
  picture,
}: CreateCategoryProps): Promise<Category | ServerError> => {
  const { error } = createCategoryValidator.validate({ name, picture });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const category = await client.category.create({
      data: {
        name,
        picture,
      },
    });
    return category;
  } catch (error) {
    return matchError(
      error,
      "Category",
      `Cannot create the category with name: ${name}`
    );
  }
};

export const updateCategory = async ({
  id,
  name,
  picture,
}: UpdateCategoryProps): Promise<Category | ServerError> => {
  const { error } = updateCategoryValidator.validate({ id, name, picture });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const category = await client.category.update({
      where: {
        id,
      },
      data: {
        name,
        picture,
      },
    });
    return category;
  } catch (error) {
    return matchError(
      error,
      "Category",
      `Cannot update the category with id: ${id}`
    );
  }
};

export const deleteCategory = async (
  id: string
): Promise<Category | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const category = await client.category.delete({
      where: {
        id,
      },
    });

    return category;
  } catch (error) {
    return matchError(
      error,
      "Category",
      `Cannot delete the category with id: ${id}`
    );
  }
};

// TODO: Implement search sort and pagination functionality
export const getModelsByCategory = async (
  id: string
): Promise<Model[] | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const models = await client.model.findMany({
      where: {
        categoryIds: {
          has: id,
        },
      },
    });
    return models;
  } catch (error) {
    return matchError(
      error,
      "Models",
      `Cannot get the models with category id: ${id}`
    );
  }
};

// TODO: Implement search sort and pagination functionality
export const getBrandsByCategory = async (
  id: string
): Promise<Brand[] | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const brands = await client.brand.findMany({
      where: {
        models: {
          some: {
            categoryIds: {
              has: id,
            },
          },
        },
      },
    });

    return brands;
  } catch (error) {
    return matchError(
      error,
      "Brands",
      `Cannot get the brands with category id: ${id}`
    );
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByCategory = async (
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
          categoryIds: {
            has: id,
          },
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
    return matchError(
      error,
      "Products",
      `Cannot get the products with category id: ${id}`
    );
  }
};
