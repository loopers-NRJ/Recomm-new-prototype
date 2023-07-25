import { NextResponse } from "next/server";
import * as Brands from "@/database/brands";
import { ServerError } from "@/util/error";

export interface Context {
  params: {
    brandId: string;
  };
}

export const GET = async (
  _: Request,
  { params: { brandId } }: Context
): Promise<Response> => {
  const brand = await Brands.getBrand(brandId);
  if (brand instanceof ServerError) {
    const response = new Response(brand.message, {
      status: brand.status,
    });
    return response;
  }
  return NextResponse.json(brand);
};

export const PUT = async (
  request: Request,
  { params: { brandId } }: Context
): Promise<Response> => {
  const { name } = await request.json();
  const brand = await Brands.updateBrand(brandId, name);
  if (brand instanceof ServerError) {
    const response = new Response(brand.message, {
      status: brand.status,
    });
    return response;
  }
  return NextResponse.json(brand);
};

export const DELETE = async (
  _: Request,
  { params: { brandId } }: Context
): Promise<Response> => {
  const brand = await Brands.deleteBrand(brandId);
  if (brand instanceof ServerError) {
    const response = new Response(brand.message, {
      status: brand.status,
    });
    return response;
  }
  return NextResponse.json(brand);
};
