import "reflect-metadata";
import "dotenv/config";

import "../src/infrastructure/di/container.js";

import app from "../app.js";
import { connectDatabase } from "../src/infrastructure/database/connect.js";

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
