import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: "postgresql"
   }),
   emailAndPassword: {
      enabled: true,
      autoSignIn: false
   },
   socialProviders: {
      google: {
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      github: {
         clientId: process.env.GITHUB_CLIENT_ID as string,
         clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      }
   },
   rateLimit: {
      window: 60, // time window in seconds
      max: 30, // max requests per window
   },
   trustedOrigins: [
      "chrome-extension://faapjophjjnpgikffnbjjiikppambglm",
      "chrome-extension://cjaecgdalifbiajfmkkmiffdhcnckmih",
   ]
})