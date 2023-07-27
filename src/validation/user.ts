import { Provider } from "@prisma/client";
import Joi from "joi";

export interface SignupProps {
  email: string;
  name: string;
  provider: string;
}

export const getProviderVarient = (provider: string): Provider => {
  let providerEnum: Provider = "Google";
  switch (provider) {
    case "google":
      providerEnum = "Google";
    // handle other providers
  }
  return providerEnum;
};

export const signupValidator = Joi.object({
  email: Joi.string().email().label("Email").required(),
  name: Joi.string().min(1).max(255).label("Name").required(),
  provider: Joi.string()
    .valid(Object.values(Provider))
    .label("Provider")
    .required(),
});
