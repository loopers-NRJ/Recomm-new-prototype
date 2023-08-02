import { NextResponse } from "next/server";
import { ServerError } from "@/lib/error";
import * as Category from "@/database/category";

export interface Context {
  params: {
    categoryId: string;
  };
}

export const GET = async (
  _: Request,
  { params: { categoryId } }: Context
): Promise<Response> => {
  const category = await Category.getCategory(categoryId);
  if (category instanceof ServerError) {
    const response = new Response(category.message, {
      status: category.status,
    });
    return response;
  }
  return NextResponse.json(category);
};

export const PUT = async (
  request: Request,
  { params: { categoryId } }: Context
): Promise<Response> => {
  const { name, picture } = await request.json();
  const category = await Category.updateCategory({
    id: categoryId,
    name,
    picture,
  });
  if (category instanceof ServerError) {
    const response = new Response(category.message, {
      status: category.status,
    });
    return response;
  }
  return NextResponse.json(category);
};

export const DELETE = async (
  _: Request,
  { params: { categoryId } }: Context
): Promise<Response> => {
  const category = await Category.deleteCategory(categoryId);
  if (category instanceof ServerError) {
    const response = new Response(category.message, {
      status: category.status,
    });
    return response;
  }
  return NextResponse.json(category);
};
