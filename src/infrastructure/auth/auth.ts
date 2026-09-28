import "dotenv/config";

import { betterAuth } from "better-auth";
import mysql from "mysql2/promise";

const mysqlPool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

const auth = betterAuth({
  database: mysqlPool,

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [process.env.FRONTEND_URL!],
});

export default auth;
