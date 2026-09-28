import { AppDataSource } from "./data-source.js";

export async function connectDatabase() {
  if (AppDataSource.isInitialized) return;

  await AppDataSource.initialize();
  console.log("Database connected successfully");
}
