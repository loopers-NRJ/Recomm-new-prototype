import { NextResponse } from "next/server";
import * as Category from "@/database/category";
import { ServerError } from "@/util/error";

export const GET = async (): Promise<Response> => {
  const categories = await Category.getCategories();
  if (categories instanceof ServerError) {
    const response = new Response(categories.message, {
      status: categories.status,
    });
    return response;
  }
  return NextResponse.json(categories);
};

export const POST = async (request: Request): Promise<Response> => {
  const { name, pictures } = await request.json();
  const category = await Category.createCategory(name, pictures);
  if (category instanceof ServerError) {
    const response = new Response(category.message, {
      status: category.status,
    });
    return response;
  }
  return NextResponse.json(category);
};
