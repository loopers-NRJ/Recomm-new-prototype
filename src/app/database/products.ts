import type { Product } from "@prisma/client";
import client from "./client";

export const getProduct = async (id: string): Promise<Product | Error> => {
  try {
    const product = await client.product.findUnique({
      where: { id },
      include: {
        model: {
          include: {
            brand: true,
          },
        },
      },
    });
    if (product == null) {
      return new Error("Product not found");
    }
    return product;
  } catch (error) {
    return new Error(`Cannot get the product with id: ${id}`);
  }
};

// TODO: check if this function is needed. If not, remove it
export const getProducts = async (): Promise<Product[] | Error> => {
  try {
    const allProducts = await client.product.findMany();
    return allProducts;
  } catch (error) {
    return new Error("Cannot get the products");
  }
};

export const createProduct = async (
  userId: string,
  modelId: string,
  price: number,
  images: string[]
): Promise<Product | Error> => {
  try {
    const model = await client.model.findUnique({
      where: {
        id: modelId,
      },
    });
    if (model == null) {
      return new Error("Model not found");
    }

    const product = await client.product.create({
      data: {
        model: {
          connect: {
            id: model.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        price,
        pictures: images,
      },
    });
    return product;
  } catch (error) {
    return new Error(`Cannot create the product with model id: ${modelId}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByUser = async (
  userId: string
): Promise<Product[] | Error> => {
  try {
    const products = await client.product.findMany({
      where: {
        userId,
      },
    });
    return products;
  } catch (error) {
    return new Error(`Cannot get the product with user id: ${userId}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByCategory = async (
  id: string
): Promise<Product[] | Error> => {
  try {
    const products = await client.product.findMany({
      where: {
        model: {
          categoryId: id,
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
    return new Error(`Cannot get the products with category id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByBrand = async (
  id: string
): Promise<Product[] | Error> => {
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
    return new Error(`Cannot get the products with brand id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByModel = async (
  id: string
): Promise<Product[] | Error> => {
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
    return new Error(`Cannot get the products with model id: ${id}`);
  }
};
