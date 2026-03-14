import { AuthConfig } from "convex/server"

export default {
  providers: [
    {
      // Replace with your Clerk Frontend API URL
      // or with `process.env.CLERK_JWT_ISSUER_DOMAIN`
      // and configure CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard
      // See https://dashboard.convex.dev/t/sergey-filimonov/polaris/energetic-sparrow-363/settings/environment-variables
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig
