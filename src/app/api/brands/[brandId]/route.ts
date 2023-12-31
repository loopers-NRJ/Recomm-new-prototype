import { NextResponse } from "next/server";
import * as Brands from "@/database/brands";
import { ServerError } from "@/lib/error";

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
  const { name, picture } = await request.json();
  const brand = await Brands.updateBrand({ id: brandId, name, picture });
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
