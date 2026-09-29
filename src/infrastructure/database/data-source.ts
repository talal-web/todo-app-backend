import "reflect-metadata";
import "dotenv/config";

import { DataSource } from "typeorm";

import { User } from "./models/User.js";
import { Todo } from "./models/Todo.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,

  entities: [User, Todo],

  migrations: ["src/infrastructure/database/migrations/*.{ts,js}"],

  synchronize: false,
  logging: false,
});
