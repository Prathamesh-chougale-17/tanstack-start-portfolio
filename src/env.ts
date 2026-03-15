import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

/**
 * Application environment schema for TanStack Start
 *
 * Using @t3-oss/env-core for server-side validation
 * All variables are server-only (no client-side exposure needed for portfolio)
 */
export const env = createEnv({
  server: {
    // Database
    MONGODB_URI: z.string().min(1),
    DATABASE_NAME: z.string().min(1),

    // Email (nodemailer)
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.string().min(1),
    EMAIL_SERVER_USER: z.string().min(1),
    EMAIL_SERVER_PASSWORD: z.string().min(1),
    EMAIL_ADMIN: z.string().min(1),

    // AI / 3rd-party APIs
    GEMINI_API_KEY: z.string().min(1),

    // Optional
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  },

  /**
   * Runtime environment values
   * These are automatically validated at startup
   */

  clientPrefix: 'VITE_',

  client: {
    // Expose the Google Site Verification ID to the client for SEO purposes
    VITE_GOOGLE_SITE_VERIFICATION_ID: z.string().min(1),
  },
  runtimeEnv: {
    // This is where you can set defaults or transformations for environment variables
    ...process.env,
    ...import.meta.env, // Include Vite's environment variables
  },
})
