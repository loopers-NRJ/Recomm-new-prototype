import type { MiddlewareFactory } from "./types";
// import { options } from "@/lib/auth";
// import { NextResponse } from "next/server";
// import { getUserByEmail } from "@/database/users";
// import { getServerSession } from "next-auth";

const authenticatedUsersOnlyRoutes: string[] = [
  // regex for routes that require authentication
];

const withUserAuthentication: MiddlewareFactory =
  (next) => async (request, event) => {
    const path = new URL(request.url).pathname;
    for (const route of authenticatedUsersOnlyRoutes) {
      const regex = new RegExp(route);
      if (regex.test(path)) {
        // the route is in the list of routes that require authentication
        // validate if the user is authenticated
        // TODO: cannot implement authorization because this line cause some error due to some bug in prisma
        // const session = await getServerSession(options);
        // if (session == null) {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }
        // const email = session.user?.email;
        // if (email == null) {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        // const user = await getUserByEmail(email);

        // if (user instanceof Error) {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        // request.user = user;
        return await next(request, event);
      }
    }
    // the route is not in the list of routes that require authentication
    return await next(request, event);
  };

export default withUserAuthentication;
