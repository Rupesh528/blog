/**
 * Loads environment variables into process.env
 * This file should be imported ONCE at app startup
 */
import dotenv from "dotenv";

dotenv.config();

/**
 * Export validated environment variables
 * Prevents undefined access across the app
 */
export const env = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
}
