"use client";

import React, { type FC, type PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
