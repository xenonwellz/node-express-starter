import app from "@/config/app";
import env from "@/config/env";
import logger from "@/config/logger";

const port = env.get("PORT") || 3000;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
