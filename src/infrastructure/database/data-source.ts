import "reflect-metadata";
import "dotenv/config";

import { DataSource } from "typeorm";

import { User } from "./models/User.js";
import { Todo } from "./models/Todo.js";
import { Session } from "./models/Session.js";
import { Account } from "./models/Account.js";
import { Verification } from "./models/Verification.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,

  entities: [User, Todo, Session, Account, Verification],

  migrations: ["src/infrastructure/database/migrations/*.{ts,js}"],

  synchronize: false,
  logging: false,
});
