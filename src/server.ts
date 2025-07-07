import mongoose from "mongoose";
import logger from "./config/logger";
import app from "./app";
import { connectDatabase } from "./db/connection";
import { config } from "./config";

let server: any;
let db: mongoose.Connection;

const StartServer = async () => {
  try {
    db = await connectDatabase();

    server = app.listen(config.PORT, () => logger.info(`✅ Server running on port ${config.PORT}`));
  } catch (error) {
    logger.error("❌ Startup error:", error);
    process.exit(0);
  }
};

const gracefulShutdown = async (signal: string, isCrash = false) => {
  logger.info(`\n${signal} received. Starting graceful shutdown...`);

  if (server) {
    server.close(() => logger.info("HTTP server closed"));
  }

  try {
    if (db) {
      await db.close();
      logger.info("Database connection closed");
    }

    logger.info("✅ Graceful shutdown complete");
    process.exit(isCrash ? 1 : 0); // 💥 If it's a crash, exit with 1
  } catch (error) {
    logger.error("❌ Error during graceful shutdown:", error);
    process.exit(1);
  }
};

// Handle different termination signals.
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("uncaughtException", (error) => {
  logger.error("❌ Uncaught Exception:", error);
  gracefulShutdown("uncaughtException", true);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection", true);
});

StartServer();
