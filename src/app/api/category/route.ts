import { NextResponse } from "next/server";
import * as Category from "@/database/category";
import { ServerError } from "@/lib/error";
import parseOptions from "@/util/parseOptions";

export const GET = async (request: Request): Promise<Response> => {
  const options = parseOptions(request.url);
  const categories = await Category.getCategories(options);
  if (categories instanceof ServerError) {
    const response = new Response(categories.message, {
      status: categories.status,
    });
    return response;
  }
  return NextResponse.json(categories);
};

export const POST = async (request: Request): Promise<Response> => {
  const { name, picture } = await request.json();
  const category = await Category.createCategory({ name, picture });
  if (category instanceof ServerError) {
    const response = new Response(category.message, {
      status: category.status,
    });
    return response;
  }
  return NextResponse.json(category);
};
