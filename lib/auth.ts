import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  rateLimit: {
    enabled: false,
  },
  ...(process.env.CROSS_SUB_DOMAIN && {
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.CROSS_SUB_DOMAIN,
    },
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  ...(process.env.TRUSTED_ORIGINS && {
    trustedOrigins: process.env.TRUSTED_ORIGINS.split(",").map((origin) => origin.trim()),
  }),
});
