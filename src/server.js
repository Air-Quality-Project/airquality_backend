import app from "./app.js";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/logger.js";

await connectDB();

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Backend running on port ${PORT}`);
});
