import type { User } from "@prisma/client";
import type { NextRequest as OriginalNextRequest } from "next/server";

declare global {
  declare interface NextRequest extends OriginalNextRequest {
    user?: User;
  }
}
