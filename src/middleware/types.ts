import type { NextMiddlewareResult } from "next/dist/server/web/types";
import type { NextFetchEvent } from "next/server";

type NextMiddleware = (
  request: NextRequest,
  event: NextFetchEvent
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
