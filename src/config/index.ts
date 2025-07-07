import dotenv from "dotenv";

// Load the appropriate .env file based on the NODE_ENV environment variable
// if (process.env.NODE_ENV !== "production") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotenv.config({ path: configFile });
// } else {
//   dotenv.config();
// }

dotenv.config();

// Export environment variables with type assertions to ensure correct types
export const config = {
  PORT: process.env.PORT as string | undefined,
  DB_URL: process.env.MONGO_URI as string,
  APP_SECRET: process.env.APP_SECRET as string,
};
