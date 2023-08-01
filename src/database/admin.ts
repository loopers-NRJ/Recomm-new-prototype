import { ServerError } from "@/lib/error";
import client, { matchError } from "./client";
import type { Admin } from "@prisma/client";

export const getAdminByUserId = async (
  userId: string
): Promise<Admin | ServerError> => {
  try {
    const admin = await client.admin.findUnique({
      where: {
        userId,
      },
    });
    if (admin == null) {
      return new ServerError(`Admin with userId: ${userId} not found`, 404);
    }
    return admin;
  } catch (error) {
    return matchError(
      error,
      "Admin",
      `Cannot find admin with userId: ${userId}`
    );
  }
};
