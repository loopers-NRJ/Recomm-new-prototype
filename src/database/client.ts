import { ServerError } from "@/lib/error";
import { PrismaClient } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const instance = new PrismaClient();

export default instance;

export const matchError = (
  error: unknown,
  entry = "entry",
  message = "Internal server error"
): ServerError => {
  if (error instanceof ServerError) {
    return error;
  }
  if (error instanceof PrismaClientValidationError) {
    return new ServerError("Invalid input", 400);
  }
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new ServerError(`${entry} already exists`, 400);
      case "P2001":
      case "P2018":
      case "P2025":
        return new ServerError(`${entry} not found`, 404);
      case "P2000":
      case "P2005":
      case "P2006":
      case "P2007":
      case "P2011":
      case "P2012":
      case "P2013":
        return new ServerError("Invalid input", 400);
      default:
        console.error(error);
        return new ServerError(message);
    }
  }
  console.error(error);
  return new ServerError(message);
};
