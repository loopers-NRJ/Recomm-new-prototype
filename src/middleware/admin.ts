// import { getAdminByUserId } from "@/database/admin";
import type { MiddlewareFactory } from "./types";
// import { NextResponse } from "next/server";
const adminsOnlyRoutes: string[] = [
  // regex for routes that require admin authentication
];

const withAdminsAuthentication: MiddlewareFactory =
  (next) => async (request, event) => {
    const path = new URL(request.url).pathname;
    for (const route of adminsOnlyRoutes) {
      const regex = new RegExp(route);
      if (regex.test(path)) {
        // the route is in the list of routes that require authentication
        // validate if the user is authenticated
        // if (request.user == null) {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }
        // const admin = getAdminByUserId(request.user.id);
        // if (admin instanceof Error) {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }
        return await next(request, event);
      }
    }
    // the route is not in the list of routes that require authentication
    return await next(request, event);
  };

export default withAdminsAuthentication;
