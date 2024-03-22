import mongoose, { ConnectOptions } from "mongoose";
import logger from "./logger";
import env from "../config/env";

const dbUrl: string = env.get("MONGO_URI") || env.get("MONGOURI");

const db = (url = dbUrl) => {
    mongoose
        .connect(url)
        .then(() => logger.info("Database connected"))
        .catch((err) => logger.error(err.message || "Database connection failed"));
};

export default db;
