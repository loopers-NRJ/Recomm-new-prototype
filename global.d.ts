import type { User } from "@prisma/client";
import type { NextRequest as OriginalNextRequest } from "next/server";

declare global {
  declare interface NextRequestWithUser extends OriginalNextRequest {
    user?: User;
  }

  type SortOptions = "asc" | "desc";
  type SortByOptions = "name" | "createdAt";

  interface FunctionalityOptions {
    search: string;
    sortOrder: SortOptions;
    sortBy: SortByOptions;
    page: number;
    limit: number;
  }
}
