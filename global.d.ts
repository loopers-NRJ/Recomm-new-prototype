import type { User, Model, Room, Brand, Product } from "@prisma/client";
import type { NextRequest as OriginalNextRequest } from "next/server";

declare global {
  declare interface NextRequestWithUser extends OriginalNextRequest {
    user?: User;
  }

  type SortOptions = "asc" | "desc";
  type SortByOptions = "name" | "createdAt";

  interface Product {
    id: string;
    createdAt: Date;
    end: Date;
    price: number;
    description: string;
    pictures: string[];
    modelId: string;
    ownerId: string;
    buyerId: string | null;
    updatedAt: Date;
    model: ItemModel;
    room: Room;
    owner: User;
    buyer: User;
  }

  interface ItemModel extends Model {
    brand: Brand;
  }

  interface Wish {
    id: number;
    category: string;
    brand: string;
    model: string;
    status: "pending" | "available";
  }

  interface FunctionalityOptions {
    search: string;
    sortOrder: SortOptions;
    sortBy: SortByOptions;
    page: number;
    limit: number;
  }
}
