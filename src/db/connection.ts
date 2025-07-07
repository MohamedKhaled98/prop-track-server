import mongoose from "mongoose"
import logger from "../config/logger";
import { config } from "../config";


const connectDatabase = async () => {
    try {
        const { connection } = await mongoose.connect(config.DB_URL);
        logger.info("✅ Connected to DB")
        return connection;
    } catch (error) {
        logger.error(('❌ Error DB connections!'));
        throw error;
    }
}

export { connectDatabase }